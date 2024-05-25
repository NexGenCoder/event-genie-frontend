import { Button, Card, Input, Layout, Result, Spin, Typography } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { useGetEventTypesQuery } from '@/app/services/eventsApi'
import { IEventType } from '@/types/event'

const { Search } = Input
const { Text, Title } = Typography

interface Step1Props {
   nextStep: () => void
   handleEventDataChange: (data: any) => void
}

const Step1 = ({ nextStep, handleEventDataChange }: Step1Props) => {
   const { data: response, isLoading, isError } = useGetEventTypesQuery()
   const [eventTypes, setEventTypes] = useState<IEventType[]>([])

   useEffect(() => {
      if (response && response.data) {
         setEventTypes(response.data)
      }
   }, [response])

   const onSearch = (value: string) => {
      if (value === '') {
         setEventTypes(response?.data as IEventType[])
      } else {
         setEventTypes(
            response?.data.filter((event) =>
               event.name.toLowerCase().includes(value.toLowerCase()),
            ) as IEventType[],
         )
      }
   }

   const selectEventType = (type: string, logo: string) => {
      handleEventDataChange({ eventType: type, eventLogo: logo })
      nextStep()
   }

   if (isLoading) {
      return (
         <Layout className="w-full flex flex-col gap-4 items-center p-6">
            <Spin size="large" />
         </Layout>
      )
   }

   if (isError) {
      return (
         <Layout className="w-full flex flex-col gap-4 items-center p-6">
            <Title level={2}>Failed to load event types</Title>
         </Layout>
      )
   }

   return (
      <Layout className="w-full flex flex-col gap-4 items-center p-6">
         <Title level={2}>Select Event Type</Title>
         <Search
            placeholder="Input search text"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            className="md:w-[60%] w-full"
            allowClear
         />
         {eventTypes && eventTypes.length ? (
            <div className="w-full flex gap-4 flex-wrap justify-center">
               {eventTypes.map((event) => (
                  <Card
                     key={event.id}
                     cover={
                        <Image
                           width={200}
                           height={200}
                           alt={event.name}
                           src={event.image_url}
                           className="w-[150px] h-[150px] p-8"
                        />
                     }
                     onClick={() =>
                        selectEventType(event.name, event.image_url)
                     }
                     className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
                  >
                     <Card.Meta
                        title={
                           <div className="p-4 text-center">
                              <Text strong>{event.name}</Text>
                           </div>
                        }
                     />
                  </Card>
               ))}
            </div>
         ) : (
            <Result
               status="404"
               title="No event types found"
               subTitle="Sorry, we couldn't find any event types."
               extra={
                  <Button
                     type="primary"
                     key="reset"
                     onClick={() => {
                        onSearch('')
                        setEventTypes(response?.data as IEventType[])
                     }}
                  >
                     Reset
                  </Button>
               }
            />
         )}
      </Layout>
   )
}

export default Step1
