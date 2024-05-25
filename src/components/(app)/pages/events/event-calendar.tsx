'use client'
import { Layout, theme } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'

import CalendarToolbar from './calendar-toolbar'

function EventCalendar() {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const localizer = momentLocalizer(moment)
   const [date, setDate] = useState(new Date())
   const [view, setView] = useState(Views.MONTH)

   const onSelectedSlot = (slotInfo: { start: Date; end: Date }) => {
      console.log(slotInfo)
   }

   const onSelecting = (range: { start: Date; end: Date }) => {
      console.log(range)
   }

   return (
      <Layout className="flex flex-col gap-2 w-full p-4 h-screen overflow-y-auto">
         <CalendarToolbar
            view={view}
            setView={setView}
            date={date}
            setDate={setDate}
         />
         <Calendar
            // events={eventsData}
            startAccessor={'start'}
            endAccessor={'end'}
            style={{
               height: '85vh',
               width: '100%',
               backgroundColor: colorBgContainer,
               color: colorTextBase,
            }}
            localizer={localizer}
            defaultView={Views.WEEK}
            selectable={true}
            toolbar={false}
            date={date}
            view={view}
            onNavigate={setDate}
            views={['month', 'week', 'day']}
            onSelectEvent={(event) => console.log(event)}
            onSelectSlot={onSelectedSlot}
         />
      </Layout>
   )
}

export default EventCalendar
