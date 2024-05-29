import React from 'react'

import UserHomePage from '@/components/(app)/pages/home/user-home-page'

interface PageProps {
   params: {
      eventid: string
   }
}

function page({ params }: PageProps) {
   return <UserHomePage eventid={params.eventid} />
}

export default page

export function generateMetadata() {
   return {
      title: 'Event Genie - App Home',
      description:
         "Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
      image: '/next.svg',
      url: 'https://getogether.com',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'https://getogether.com',
         title: 'Event Genie - Home',
         description:
            "Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'Event Genie - Home',
         description:
            "Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
         image: '/next.svg',
      },
   }
}
