'use client'
import { Button, Layout, Result, Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
   useGetEventDetailsQuery,
   useGetEventUserListQuery,
} from '@/app/services/eventsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AppPageComponent from '../../reusuable/app-page-component'
import DMSidebar from '../../sidebar/dms'
import DirectMessage from './'

interface DirectMessagePageProps {
   eventid: string
}

function DirectMessagePage({ eventid }: DirectMessagePageProps) {
   const { data: userList, isLoading: isUserListFetching } =
      useGetEventUserListQuery(eventid)
   const { data: eventData, isLoading: isEventDataFetching } =
      useGetEventDetailsQuery(eventid)
   const [searchParam] = useSearchParams()
   const { data: userData } = useIsAuthenticated()
   const [open, setOpen] = useState(false)

   const router = useRouter()
   useEffect(() => {
      if (userList && userList?.data) {
         router.push(`/app/${eventid}/dms?dms=${userList?.data[0].userid}`)
      }
   }, [eventid, router, userList])

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isUserListFetching && isEventDataFetching)
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
         title="Direct Messages"
         open={open}
         setOpen={setOpen}
         sidebar={
            <>
               {userList?.data && (
                  <DMSidebar eventid={eventid} userList={userList?.data} />
               )}
            </>
         }
         mainsection={
            !searchParam ? (
               <Layout className="relative w-full min-h-screen flex flex-col justify-center">
                  <Result
                     title="Select a User"
                     subTitle="Select a user to start conversation"
                  />
               </Layout>
            ) : (
               userData &&
               searchParam &&
               searchParam[1] && (
                  <DirectMessage
                     userdata={userData}
                     receiverid={searchParam[1]}
                     onBack={() => setOpen(!open)}
                  />
               )
            )
         }
      />
   )
}

export default DirectMessagePage
