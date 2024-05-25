import { Flex, Image, Layout, theme, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

interface ChatMessageProps {
   type: 'text' | 'image' | 'video'
   content: string
   sender: {
      name: string
      avatar: string
   }
   timestamp: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({
   type,
   content,
   sender,
   timestamp,
}) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const isSentByCurrentUser = sender.name === 'You'

   return (
      <Layout
         className={`flex w-full mb-4 ${
            isSentByCurrentUser ? 'justify-end' : 'justify-start'
         }`}
      >
         <Layout
            className={`w-fit max-w-xs border p-2 rounded-lg shadow-md `}
            style={{
               borderColor: colorBgTextHover,
               alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
            }}
         >
            <Flex gap="small" className="w-full" align="center">
               {!isSentByCurrentUser && (
                  <Image
                     src={sender.avatar}
                     width={32}
                     height={32}
                     alt="avatar"
                     className="w-8 h-8 rounded-full"
                  />
               )}
               <Flex vertical>
                  <Text strong>{sender.name}</Text>
                  <Text>{timestamp}</Text>
               </Flex>
               {isSentByCurrentUser && (
                  <Image
                     src={sender.avatar}
                     width={32}
                     height={32}
                     alt="avatar"
                     className="w-8 h-8 rounded-full"
                  />
               )}
            </Flex>
            <div className="p-2">
               {type === 'text' && <Text>{content}</Text>}
               {type === 'image' && (
                  <Image
                     src={content}
                     width={150}
                     alt="image"
                     className="rounded-lg object-cover"
                  />
               )}
               {type === 'video' && (
                  <video controls className="rounded-lg">
                     <source src={content} type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
               )}
            </div>
         </Layout>
      </Layout>
   )
}

export default ChatMessage
