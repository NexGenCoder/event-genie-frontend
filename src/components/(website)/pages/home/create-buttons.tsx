'use client'
import { Card, Layout, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const { Text, Title } = Typography

const homeButtons = [
   {
      id: 1,
      name: 'Create Event',
      image_url: '/svgs/add.svg',
      url: '/create-event',
   },
   {
      id: 2,
      name: 'Join Event',
      image_url: '/svgs/addEvent.svg',
      url: '/join-event',
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

   return (
      <Layout className="w-full flex flex-col gap-4 items-center justify-center md:w-[80%] ">
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
         </div>
      </Layout>
   )
}

export default CreateButtons
