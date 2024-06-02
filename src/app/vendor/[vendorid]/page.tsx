import React from 'react'

import VendorHomePage from '@/components/(vendor)/pages/home/vendor-home-page'

interface PageProps {
   params: {
      vendorid: string
   }
}

function page({ params }: PageProps) {
   return <VendorHomePage vendorid={params.vendorid} />
}

export default page

export function generateMetadata() {
   return {
      title: 'Event Genie - App Home',
      description:
         "Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
      image: '/next.svg',
      url: 'http://eg.gittrackr.engineer',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'http://eg.gittrackr.engineer',
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
