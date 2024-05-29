import { Flex, Image, Layout, theme, Typography } from 'antd'
import moment from 'moment'
import React from 'react'

const { Text } = Typography

interface ChatMessageProps {
   userid: string
   type: 'text' | 'image' | 'video'
   content: string
   timestamp: string
   sender: {
      userid: string
      name: string
      username: string
      avatar: string
   }
}

const formatRelativeTime = (inputTime: Date | string | number): string => {
   const now = moment()
   const duration = moment.duration(now.diff(moment(inputTime)))

   if (duration.asSeconds() < 60) {
      return `${Math.floor(duration.asSeconds())}s ago`
   } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m ago`
   } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h ago`
   } else {
      return `${Math.floor(duration.asDays())}d ago`
   }
}

const ChatMessage: React.FC<ChatMessageProps> = ({
   userid,
   type,
   content,
   timestamp,
   sender,
}) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const isSentByCurrentUser = sender.userid === userid

   return (
      <Layout
         className={`flex  w-full mb-4 z-10 ${
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
                  <Text>{formatRelativeTime(timestamp)}</Text>
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
