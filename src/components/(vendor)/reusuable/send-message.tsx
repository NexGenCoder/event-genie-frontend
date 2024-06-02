import { Button, Flex, Image, Input, theme, Tooltip } from 'antd'
import React, { useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'

import { imageUpload } from '@/utils/uploadImage'

const { TextArea } = Input

interface SendMessageProps {
   onSend: (type: 'text' | 'image' | 'video', content: string) => void
}

const SendMessage: React.FC<SendMessageProps> = ({ onSend }) => {
   const [message, setMessage] = useState('')
   const [file, setFile] = useState<File | null>(null)
   const [fileType, setFileType] = useState<'image' | 'video' | null>(null)
   const [preview, setPreview] = useState<string | null>(null)
   const fileInput = useRef<HTMLInputElement>(null)

   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const handleSend = async () => {
      if (message) {
         onSend('text', message)
         setMessage('')
      } else if (file && fileType) {
         imageUpload(file, fileType).then((url) => {
            onSend(fileType, url)
         })
         setFile(null)
         setFileType(null)
         setPreview(null)
      }
   }

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
         const type = selectedFile.type.startsWith('image') ? 'image' : 'video'
         setFile(selectedFile)
         setFileType(type)
         const reader = new FileReader()
         reader.onloadend = () => {
            setPreview(reader.result as string)
         }
         reader.readAsDataURL(selectedFile)
      }
   }

   const handleDeleteFile = () => {
      setFile(null)
      setFileType(null)
      setPreview(null)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault()
         handleSend()
      }
   }

   return (
      <Flex
         className="bottom-0 left-0 w-full p-4"
         style={{ backgroundColor: colorBgContainer }}
         vertical
      >
         {preview && (
            <Flex
               align="center"
               className="relative w-full h-auto p-2 border border-gray-300 rounded-md mb-2"
            >
               {fileType === 'image' ? (
                  <div className="relative">
                     <Image
                        src={preview}
                        alt="preview"
                        height={150}
                        className="shadow-lg rounded-md mb-2"
                     />
                     <Tooltip title="Delete">
                        <Button
                           type="text"
                           icon={<MdDelete size={20} />}
                           className={`absolute top-0 right-0 shadow-lg`}
                           style={{ backgroundColor: colorBgContainer }}
                           onClick={handleDeleteFile}
                        />
                     </Tooltip>
                  </div>
               ) : (
                  <div className="relative">
                     <video
                        src={preview}
                        controls
                        className="w-52 h-52 rounded-md"
                     />
                     <Tooltip title="Delete">
                        <Button
                           type="text"
                           icon={<MdDelete size={20} />}
                           className="absolute top-0 right-0"
                           onClick={handleDeleteFile}
                        />
                     </Tooltip>
                  </div>
               )}
            </Flex>
         )}
         <Flex
            gap="small"
            justify="center"
            align="center"
            style={{ width: '100%' }}
         >
            <Button
               type="text"
               icon={<GrAttachment size={23} />}
               onClick={() => fileInput.current?.click()}
            />
            <TextArea
               className="w-full p-2 border border-gray-300 rounded-md"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Type your message..."
               autoSize={{ minRows: 1, maxRows: 3 }}
            />
            <input
               type="file"
               ref={fileInput}
               accept="image/*,video/*"
               onChange={handleFileChange}
               className="hidden"
            />
            <Button
               type="text"
               icon={<IoSend size={25} />}
               onClick={handleSend}
            />
         </Flex>
      </Flex>
   )
}

export default SendMessage
