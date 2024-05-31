import { Layout } from 'antd'

import UserRsvp from '@/components/(website)/pages/rsvp'

export default function RsvpPage() {
   return (
      <Layout className="flex w-full min-h-screen  flex-col items-center justify-between md:px-16 p-4">
         <UserRsvp />
      </Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'RSVP - Event Genie',
      description:
         "Accept or reject the invitations you've received. Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
      image: '/next.svg',
      url: 'http://eg.gittrackr.engineer',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'http://eg.gittrackr.engineer',
         title: 'RSVP - Event Genie',
         description:
            "Accept or reject the invitations you've received. Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'RSVP - Event Genie',
         description:
            "Accept or reject the invitations you've received. Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
         image: '/next.svg',
      },
   }
}
