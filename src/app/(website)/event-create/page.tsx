import EventCreation from '@/components/create-event/EventCreation'
import { Layout } from 'antd'
import React from 'react'

function EventCreatePage() {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6">
         <EventCreation />
      </Layout>
   )
}

export default EventCreatePage
