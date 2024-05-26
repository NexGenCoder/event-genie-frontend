'use client'
import { Flex, Layout, Result } from 'antd'
import React, { useEffect } from 'react'

import { useGetEventChannelsQuery } from '@/app/services/eventsApi'
import UserHome from '@/components/(app)/pages/home'
import HomeSidebar from '@/components/(app)/sidebar/home'
import Menus from '@/components/(app)/sidebar/menu'
import { useRouter, useSearchParams } from 'next/navigation'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

interface UserHomePageProps {
   params: {
      eventid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   const { data: channelList } = useGetEventChannelsQuery(params.eventid)
   const [searchParam] = useSearchParams()
   const { data: userData } = useIsAuthenticated()

   const router = useRouter()

   useEffect(() => {
      if (channelList && channelList?.data) {
         router.push(
            `/app/${params.eventid}?channelid=${channelList.data[0].channels[0].channelid}`,
         )
      }
   }, [channelList, params.eventid, router])

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
            {/* {userData && searchParam && searchParam[1] && (
               <UserHome userdata={userData} channelId={searchParam[1]} />
            )} */}
            {
               // if searchParam is not present, render a result component with a message and if searchParam is present, render UserHome component
               !searchParam ? (
                  <Layout className="relative w-full min-h-screen  flex flex-col justify-center">
                     <Result
                        title="Select a channel"
                        subTitle="Select a channel to start conversation"
                     />
                  </Layout>
               ) : (
                  userData &&
                  searchParam &&
                  searchParam[1] && (
                     <UserHome userdata={userData} channelId={searchParam[1]} />
                  )
               )
            }
         </Flex>
      </Layout>
   )
}

export default UserHomePage
