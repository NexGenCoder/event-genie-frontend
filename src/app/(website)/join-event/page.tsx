import { Layout } from 'antd'
import React from 'react'

import JoinEvent from '@/components/(website)/join-event'

const JoinEventPage = () => {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
         <JoinEvent />
      </Layout>
   )
}

export default JoinEventPage

export function generateMetadata() {
   return {
      title: 'Join Event - Event Genie',
      description:
         "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
      image: '/next.svg',
      url: 'http://eg.gittrackr.engineer/join-event',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'http://eg.gittrackr.engineer/join-as-vendor',
         title: 'Join Event - Event Genie',
         description:
            "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'Join Event - Event Genie',
         description:
            "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
         image: '/next.svg',
      },
   }
}
