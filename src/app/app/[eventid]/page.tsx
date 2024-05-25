'use client'
import { Flex, Layout } from 'antd'
import React from 'react'

import {
   useGetEventChannelsQuery,
   useGetEventDetailsQuery,
} from '@/app/services/eventsApi'
import UserAccount from '@/components/(app)/pages/account'
import UserHome from '@/components/(app)/pages/home'
import HomeSidebar from '@/components/(app)/sidebar/home'
import Menus from '@/components/(app)/sidebar/menu'

interface UserHomePageProps {
   params: {
      eventid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   const { data: channelList } = useGetEventChannelsQuery(params.eventid)

   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus eventid={params.eventid} />

               {channelList?.data && (
                  <HomeSidebar
                     eventid={params.eventid}
                     channelList={channelList?.data}
                  />
               )}
            </Flex>
            <UserHome />
         </Flex>
      </Layout>
   )
}

export default UserHomePage
