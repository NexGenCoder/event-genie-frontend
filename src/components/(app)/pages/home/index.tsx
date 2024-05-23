'use client'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { useSearchParams } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from './chat-message'
import SendMessage from './send-message'
import { Flex, Layout } from 'antd'

function UserHome() {
   const [searchParams] = useSearchParams()
   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()
   const [messages, setMessages] = useState([
      {
         type: 'text',
         content: 'Hello, how are you?',
         sender: {
            name: 'Alice',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: '10:00 AM',
      },
      {
         type: 'image',
         content:
            'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         sender: {
            name: 'Bob',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: '10:01 AM',
      },
      {
         type: 'video',
         content: 'https://www.w3schools.com/html/mov_bbb.mp4',
         sender: {
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
      const newMessage = {
         type,
         content,
         sender: {
            name: 'You',
            avatar:
               'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
         },
         timestamp: new Date().toLocaleTimeString(),
      }
      setMessages([...messages, newMessage])
   }

   return (
      <Layout className="relative w-full h-screen overflow-y-auto">
         <Flex vertical gap="middle" className="p-4">
            {messages.map((message, index) => (
               <ChatMessage
                  key={index}
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
