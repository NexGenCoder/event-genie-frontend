import { Layout } from 'antd'

import UserEvents from '@/components/(website)/pages/events'

export default function EventPage() {
   return (
      <Layout className="flex w-full min-h-screen  flex-col items-center justify-between md:px-16 p-4">
         <UserEvents />
      </Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'Events - Event Genie',
      description:
         "Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences. Event Genie is a platform that helps you find and create events that you'll love.",
      image: '/next.svg',
      url: 'https://getogether.com',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'https://getogether.com',
         title: 'Events - Event Genie',
         description:
            "Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences. Event Genie is a platform that helps you find and create events that you'll love.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'Events - Event Genie',
         description:
            "Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences. Event Genie is a platform that helps you find and create events that you'll love.",
         image: '/next.svg',
      },
   }
}
