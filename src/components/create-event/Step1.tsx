import React from 'react'
import { Card, Flex, Typography } from 'antd'
import Image from 'next/image'

const { Text } = Typography

const eventTypes = [
   { type: 'Birthday', image: '/app/user.jpg' },
   { type: 'Wedding', image: '/app/user.jpg' },
   { type: 'Meeting', image: '/app/user.jpg' },
]

interface Step1Props {
   nextStep: () => void
   handleEventDataChange: (data: any) => void
}

const Step1 = ({ nextStep, handleEventDataChange }: Step1Props) => {
   const selectEventType = (type: string) => {
      handleEventDataChange({ eventType: type })
      nextStep()
   }

   return (
      <Flex gap="middle">
         {eventTypes.map((event) => (
            <Card
               key={event.type}
               cover={
                  <Image
                     width={200}
                     height={200}
                     alt={event.type}
                     src={event.image}
                  />
               }
               onClick={() => selectEventType(event.type)}
               className="cursor-pointer"
            >
               <Card.Meta title={event.type} className="text-center" />
            </Card>
         ))}
      </Flex>
   )
}

export default Step1
