'use client'

import { Button, Layout, Result, Spin } from 'antd'
import React from 'react'

import { useGetUserRsvpQuery } from '@/app/services/rsvpApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import UserRsvps from './user-rsvps'

function UserRsvp() {
   const { data: userRsvps, isLoading: isRsvpDataFetching } =
      useGetUserRsvpQuery()
   const { isLoggedin, isLoading } = useIsAuthenticated()

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isLoading && isRsvpDataFetching)
      return (
         <Layout className="flex items-center justify-center w-full">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (!isLoggedin) {
      return (
         <Layout className="flex items-center justify-center w-full">
            <Result
               status="403"
               title="You are not logged in"
               subTitle="Please log in to view your events"
               extra={
                  <Button type="primary" href="/login" key="console">
                     Log in
                  </Button>
               }
            />
         </Layout>
      )
   }
   return (
      <Layout className="flex flex-col gap-4 items-center w-full">
         {userRsvps && userRsvps.data.length ? (
            <UserRsvps rsvps={userRsvps.data} />
         ) : (
            <Result
               status="404"
               title="You have ano any invitations yet"
               subTitle="You can request to join an event by browsing the events page"
               extra={
                  <Button type="primary" href="/events" key="console">
                     Browse Events
                  </Button>
               }
            />
         )}
      </Layout>
   )
}

export default UserRsvp
