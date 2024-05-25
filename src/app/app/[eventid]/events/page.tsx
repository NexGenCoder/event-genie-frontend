import { Flex, Layout } from 'antd'
import React from 'react'

import EventCalendar from '@/components/(app)/pages/events/event-calendar'
import EventSidebar from '@/components/(app)/sidebar/events'
import Menus from '@/components/(app)/sidebar/menu'

interface DMsPageProps {
   params: {
      eventid: string
   }
}

function DMsPage({ params }: DMsPageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus eventid={params.eventid} />
               <EventSidebar eventid={params.eventid} />
            </Flex>
            <EventCalendar />
         </Flex>
      </Layout>
   )
}

export default DMsPage
