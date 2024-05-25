'use client'
import { Flex, Layout } from 'antd'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { Message, SendMessageBody } from '@/types/message'

import ChatMessage from './chat-message'
import SendMessage from './send-message'

function UserHome() {
   const [searchParams] = useSearchParams()
   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()
   const [messages, setMessages] = useState<Message[]>([
      {
         messageid: '1',
         channelid: 'general',
         type: 'text',
         content: 'Hello, how are you?',
         sender: {
            userid: '1',
            name: 'Alice',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: '10:00 AM',
      },
      {
         messageid: '2',
         channelid: 'general',
         type: 'image',
         content:
            'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         sender: {
            userid: '2',
            name: 'Bob',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: '10:01 AM',
      },
      {
         messageid: '3',
         channelid: 'general',
         type: 'video',
         content: 'https://www.w3schools.com/html/mov_bbb.mp4',
         sender: {
            userid: '3',
            name: 'Charlie',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: '10:02 AM',
      },
   ])
   const messagesEndRef = useRef<HTMLDivElement>(null)

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
   }

   useEffect(() => {
      scrollToBottom()
   }, [messages])

   const handleSend = (type: 'text' | 'image' | 'video', content: string) => {
      const newMessage: Message = {
         messageid: Math.random().toString(36).substr(2, 9), // Generate a random id for simplicity
         channelid: 'general',
         type,
         content,
         sender: {
            userid: '4',
            name: 'You',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: new Date().toLocaleTimeString(),
      }
      const messageBody: SendMessageBody = {
         channelid: 'general',
         type,
         content,
      }
      console.log({ messageBody })

      setMessages([...messages, newMessage])
   }

   return (
      <Layout className="relative w-full h-screen overflow-y-auto">
         <Flex vertical gap="middle" className="p-4">
            {messages.map((message) => (
               <ChatMessage
                  key={message.messageid}
                  type={message.type}
                  content={message.content}
                  sender={message.sender}
                  timestamp={message.timestamp}
               />
            ))}
            <div ref={messagesEndRef} />
         </Flex>
         <SendMessage onSend={handleSend} />
      </Layout>
   )
}

export default UserHome
