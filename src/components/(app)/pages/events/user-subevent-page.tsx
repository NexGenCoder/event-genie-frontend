'use client'

import { Button, Layout, Result } from 'antd'
import React, { useState } from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AppPageComponent from '../../reusuable/app-page-component'
import EventSidebar from '../../sidebar/events'
import EventCalendar from './event-calendar'

interface UserSubeventPageProps {
   eventid: string
}

function UserSubeventPage({ eventid }: UserSubeventPageProps) {
   const [open, setOpen] = useState(false)
   const { isLoggedin } = useIsAuthenticated()

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
      <AppPageComponent
         eventid={eventid}
         title="Subevents"
         open={open}
         setOpen={setOpen}
         sidebar={<EventSidebar eventid={eventid} />}
         mainsection={<EventCalendar />}
      />
   )
}

export default UserSubeventPage
