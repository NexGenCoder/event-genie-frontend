import EventCalendar from '@/components/(app)/pages/events/event-calendar'
import EventSidebar from '@/components/(app)/sidebar/events'
import Menus from '@/components/(app)/sidebar/menu'
import { Flex, Layout } from 'antd'
import React from 'react'

interface DMsPageProps {
   params: {
      userid: string
   }
}

function DMsPage({ params }: DMsPageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus userid={params.userid} />
               <EventSidebar userid={params.userid} />
            </Flex>
            <EventCalendar />
         </Flex>
      </Layout>
   )
}

export default DMsPage
