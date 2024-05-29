'use client'
import { Flex, Layout, Result } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { useGetUserDetailsQuery } from '@/app/services/eventsApi'
import {
   useGetDirectMessagesQuery,
   useSendDirectMessagesMutation,
} from '@/app/services/messageApi'
import {
   IDirectMessageInput,
   IMessage,
   ISendMessageBody,
} from '@/types/message'
import { IUser } from '@/types/user'
import socket from '@/utils/socket'

import ChatMessage from '../../reusuable/chat-message'
import SendMessage from '../../reusuable/send-message'
import DirectMessageUserDetails from './dmUserDetails'

interface DirectMessageProps {
   userdata: IUser
   receiverid: string
   onBack?: () => void
}

function DirectMessage({ userdata, receiverid, onBack }: DirectMessageProps) {
   const [messages, setMessages] = useState<IMessage[]>([])
   const messagesEndRef = useRef<HTMLDivElement>(null)

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
   }

   const [sendMessages, { isLoading: isMessageSending }] =
      useSendDirectMessagesMutation()

   const { data: messageData, isLoading } = useGetDirectMessagesQuery({
      user1id: userdata.userid,
      user2id: receiverid,
   })
   const { data: userDetails } = useGetUserDetailsQuery(receiverid)

   useEffect(() => {
      if (messageData) {
         setMessages(messageData)
      }
   }, [messageData])

   useEffect(() => {
      console.log('Connecting to server')
      socket.on('connect', () => {
         console.log('Connected to server')
      })
      socket.emit('join', receiverid)

      socket.on('disconnect', () => {
         console.log('Disconnected from server')
      })

      return () => {
         socket.emit('leave', receiverid)
         socket.off('message')
      }
   }, [receiverid])

   useEffect(() => {
      const handleNewMessage = (message: IMessage) => {
         console.log('message', message)
         setMessages((prevMessages) => [...prevMessages, message])
      }
      socket.on('message', handleNewMessage)
      return () => {
         socket.off('message', handleNewMessage)
      }
   }, [receiverid])

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   const handleSend = async (
      type: 'text' | 'image' | 'video',
      content: string,
   ) => {
      const messageBody: ISendMessageBody = {
         channelid: receiverid,
         type,
         content,
         sender: {
            userid: userdata?.userid,
            name: `${userdata?.firstname} ${userdata?.lastname}`,
            avatar: userdata?.profile_picture,
         },
         timestamp: new Date().toISOString(),
      }

      const requestBody: IDirectMessageInput = {
         senderid: userdata.userid,
         receiverid: receiverid,
         type: type,
         content: content,
      }

      socket.emit('message', messageBody)
      try {
         await sendMessages(requestBody)
      } catch (error) {
         console.error('Error sending message', error)
      }
   }

   const messageSearchHandler = () => {
      console.log('Search')
   }

   return (
      <Layout className="w-full h-screen flex flex-col justify-between">
         {userDetails && (
            <DirectMessageUserDetails
               userDetails={userDetails.data[0]}
               onBack={onBack}
               onSearch={messageSearchHandler}
            />
         )}
         <Layout className="flex-1 overflow-y-auto">
            {messages && messages.length ? (
               <Flex vertical gap="middle" className="p-4">
                  {messages.map((message) => (
                     <ChatMessage
                        key={message.messageid}
                        userid={userdata.userid}
                        {...message}
                     />
                  ))}
               </Flex>
            ) : isLoading ? (
               <Result title="Loading messages..." />
            ) : (
               <Result title="No messages found" />
            )}
            <div ref={messagesEndRef} />
         </Layout>

         <SendMessage onSend={handleSend} />
      </Layout>
   )
}

export default DirectMessage
