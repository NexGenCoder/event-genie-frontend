import EventCreation from '@/components/create-event'
import { Layout } from 'antd'
import React from 'react'

function EventCreatePage() {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
         <EventCreation />
      </Layout>
   )
}

export default EventCreatePage

export function generateMetadata() {
   return {
      title: 'Event Genie - Create Event',
      description:
         "Create your own events on Event Genie. Whether it's a small gathering or a large festival, our platform makes event creation easy and fun.",
      image: '/next.svg',
      url: 'https://getogether.com/create-event',
      keywords:
         'create event, event planning, event creation, host events, organize events',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'https://getogether.com/create-event',
         title: 'Event Genie - Create Event',
         description:
            "Create your own events on Event Genie. Whether it's a small gathering or a large festival, our platform makes event creation easy and fun.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'Event Genie - Create Event',
         description:
            "Create your own events on Event Genie. Whether it's a small gathering or a large festival, our platform makes event creation easy and fun.",
         image: '/next.svg',
      },
   }
}
