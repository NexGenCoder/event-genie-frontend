'use client'
import { Card, Layout, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { IEvent, IUserEventsList } from '@/types/event'

const { Text, Title } = Typography

interface UserEventsProps {
   events: IEvent[]
}
function UserEvents({ events }: UserEventsProps) {
   const router = useRouter()
   const { isLoggedin, isLoading } = useIsAuthenticated()

   if (isLoading) return null
   if (!isLoggedin) return null

   return (
      <Layout className="w-full flex flex-col gap-4 items-center justify-center md:w-[80%] ">
         <Title level={3} className="text-center">
            Your Events
         </Title>
         <Text className="text-center">
            Events you are hosting or attending
         </Text>
         <div className="w-full flex gap-4 flex-wrap justify-center">
            {events.map((event) => (
               <Card
                  key={event.eventid}
                  cover={
                     <Image
                        width={200}
                        height={200}
                        alt={event.event_name}
                        src={event.event_logo}
                        className="w-[150px] h-[150px] p-8"
                     />
                  }
                  onClick={() => router.push(`/app/${event.eventid}`)}
                  className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
               >
                  <Card.Meta
                     title={
                        <div className="p-4 text-center">
                           <Text strong>{event.event_name}</Text>
                        </div>
                     }
                  />
               </Card>
            ))}
         </div>
      </Layout>
   )
}

export default UserEvents
