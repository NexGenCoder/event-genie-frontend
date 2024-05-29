'use client'
import { Button, Layout, Result, Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
   useGetEventChannelsQuery,
   useGetEventDetailsQuery,
} from '@/app/services/eventsApi'
import UserHome from '@/components/(app)/pages/home'
import HomeSidebar from '@/components/(app)/sidebar/home'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AppPageComponent from '../../reusuable/app-page-component'

interface UserHomePageProps {
   eventid: string
}

function UserHomePage({ eventid }: UserHomePageProps) {
   const { data: channelList, isLoading: isEventChannelsFetching } =
      useGetEventChannelsQuery(eventid)
   const { data: eventData, isLoading: isEventDataFetching } =
      useGetEventDetailsQuery(eventid)
   const [searchParam] = useSearchParams()
   const { data: userData } = useIsAuthenticated()
   const [open, setOpen] = useState(false)

   const router = useRouter()
   useEffect(() => {
      if (channelList && channelList?.data) {
         router.push(
            `/app/${eventid}?channelid=${channelList.data[0].channels[0].channelid}`,
         )
      }
   }, [channelList, eventid, router])

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isEventChannelsFetching && isEventDataFetching)
      return (
         <Layout className="flex items-center justify-center w-full min-h-screen">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (!eventData) {
      return (
         <Layout className="relative w-full min-h-screen flex flex-col justify-center">
            <Result
               status="404"
               title="Event not found"
               subTitle="Sorry, the event you are looking for does not exist."
               extra={
                  <Button type="primary" onClick={() => router.push('/')}>
                     Back Home
                  </Button>
               }
            />
         </Layout>
      )
   }

   return (
      <AppPageComponent
         eventid={eventid}
         title="Home"
         open={open}
         setOpen={setOpen}
         sidebar={
            <>
               {channelList?.data && (
                  <HomeSidebar
                     eventid={eventid}
                     channelList={channelList?.data}
                  />
               )}
            </>
         }
         mainsection={
            !searchParam ? (
               <Layout className="relative w-full min-h-screen flex flex-col justify-center">
                  <Result
                     title="Select a channel"
                     subTitle="Select a channel to start conversation"
                  />
               </Layout>
            ) : (
               userData &&
               searchParam &&
               searchParam[1] && (
                  <UserHome
                     userdata={userData}
                     channelId={searchParam[1]}
                     onBack={() => setOpen(!open)}
                  />
               )
            )
         }
      />
   )
}

export default UserHomePage
