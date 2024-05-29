'use client'
import { Flex, Layout, Result } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { useGetUserDetailsQuery } from '@/app/services/eventsApi'
import {
   useGetMessagesQuery,
   useSendMessagesMutation,
} from '@/app/services/messageApi'
import { IMessage, ISendMessageBody } from '@/types/message'
import { IUser } from '@/types/user'
import socket from '@/utils/socket'

import ChatMessage from '../../reusuable/chat-message'
import SendMessage from '../../reusuable/send-message'
import DirectMessageUserDetails from './direct-message-user-details'

interface DirectMessageProps {
   userdata: IUser
   channelId: string
   onBack?: () => void
}

function DirectMessage({ userdata, channelId, onBack }: DirectMessageProps) {
   const [messages, setMessages] = useState<IMessage[]>([])
   const messagesEndRef = useRef<HTMLDivElement>(null)

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
   }

   const [sendMessages, { isLoading: isMessageSending }] =
      useSendMessagesMutation()

   const { data: messageData, isLoading } = useGetMessagesQuery(channelId)
   // const { data: userDetails } = useGetUserDetailsQuery(channelId)
   const userDetails = {
      data: {
         profile_picture: '/logo.jpg',
         userid: '1',
         username: 'username',
         email: 'email',
         firstname: 'firstname',
         lastname: 'lastname',
         bio: 'bio',
         is_mobile_verified: true,
         is_email_verified: true,
         is_profile_completed: true,
         is_account_suspended: true,
      },
   }

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
      socket.emit('join', channelId)

      socket.on('disconnect', () => {
         console.log('Disconnected from server')
      })

      return () => {
         socket.emit('leave', channelId)
         socket.off('message')
      }
   }, [channelId])

   useEffect(() => {
      const handleNewMessage = (message: IMessage) => {
         console.log('message', message)
         setMessages((prevMessages) => [...prevMessages, message])
      }

      socket.on('message', handleNewMessage)

      return () => {
         socket.off('message', handleNewMessage)
      }
   }, [channelId])

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   const handleSend = async (
      type: 'text' | 'image' | 'video',
      content: string,
   ) => {
      const messageBody: ISendMessageBody = {
         channelid: channelId,
         type,
         content,
         sender: {
            userid: userdata?.userid,
            name: `${userdata?.firstname} ${userdata?.lastname}`,
            avatar: userdata?.profile_picture,
         },
         timestamp: new Date().toISOString(),
      }

      socket.emit('message', messageBody)
      try {
         await sendMessages({ channelId, body: messageBody })
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
               userDetails={userDetails.data}
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
