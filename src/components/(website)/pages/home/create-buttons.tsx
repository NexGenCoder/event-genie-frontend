'use client'
import { Card, Layout, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import JoinEventModal from '../../join-event'

const { Text, Title } = Typography

const homeButtons = [
   {
      id: 1,
      name: 'Create Event',
      image_url: '/svgs/add.svg',
      url: '/create-event',
   },
   {
      id: 3,
      name: 'Join as a Vendor',
      image_url: '/svgs/food-stall-stall-svgrepo-com.svg',
      url: '/join-as-vendor',
   },
]

function CreateButtons() {
   const router = useRouter()
   const [open, SetOpen] = useState(false)

   return (
      <Layout className="w-full flex flex-col gap-4 items-center justify-center md:w-[80%] min-h-screen">
         <Title level={3} className="text-center">
            What would you like to do?
         </Title>
         <Text className="text-center">
            Choose an option below to get started.
         </Text>
         <div className="w-full flex gap-4 flex-wrap justify-center">
            {homeButtons.map((button) => (
               <Card
                  key={button.id}
                  cover={
                     <Image
                        width={200}
                        height={200}
                        alt={button.name}
                        src={button.image_url}
                        className="w-[150px] h-[150px] p-8"
                     />
                  }
                  onClick={() => router.push(button.url)}
                  className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
               >
                  <Card.Meta
                     title={
                        <div className="p-4 text-center">
                           <Text strong>{button.name}</Text>
                        </div>
                     }
                  />
               </Card>
            ))}

            <Card
               key="2"
               cover={
                  <Image
                     width={200}
                     height={200}
                     alt="Join Event"
                     src="/svgs/addEvent.svg"
                     className="w-[150px] h-[150px] p-8"
                  />
               }
               onClick={() => SetOpen(true)}
               className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
            >
               <Card.Meta
                  title={
                     <div className="p-4 text-center">
                        <Text strong>Join Event</Text>
                     </div>
                  }
               />
            </Card>
         </div>
         <JoinEventModal open={open} setOpen={SetOpen} />
      </Layout>
   )
}

export default CreateButtons
