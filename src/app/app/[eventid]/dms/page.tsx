import { Flex, Layout } from 'antd'
import React from 'react'

import UserAccount from '@/components/(app)/pages/account'
import DMSidebar from '@/components/(app)/sidebar/dms'
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
               <DMSidebar eventid={params.eventid} />
            </Flex>
            <UserAccount />
         </Flex>
      </Layout>
   )
}

export default DMsPage
