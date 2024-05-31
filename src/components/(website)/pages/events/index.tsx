'use client'

import { Button, Layout, Result, Spin } from 'antd'
import React from 'react'

import { useGetUserEventsQuery } from '@/app/services/eventsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import UserEventsList from './user-events'

function UserEvents() {
   const { data: userEvents, isLoading: isEventsFetching } =
      useGetUserEventsQuery()
   const { isLoggedin, isLoading } = useIsAuthenticated()

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isLoading && isEventsFetching)
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
         {userEvents && userEvents.data.length ? (
            <UserEventsList events={userEvents.data} />
         ) : (
            <Result
               status="404"
               title="You have no events yet"
               subTitle="You can create an event by clicking the button below"
               extra={
                  <Button type="primary" href="/create-event" key="console">
                     Create Event
                  </Button>
               }
            />
         )}
      </Layout>
   )
}

export default UserEvents
