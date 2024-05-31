'use client'

import React, { useState } from 'react'

import AppPageComponent from '../../reusuable/app-page-component'
import EventSidebar from '../../sidebar/events'
import EventCalendar from './event-calendar'

interface UserSubeventPageProps {
   eventid: string
}

function UserSubeventPage({ eventid }: UserSubeventPageProps) {
   const [open, setOpen] = useState(false)

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
