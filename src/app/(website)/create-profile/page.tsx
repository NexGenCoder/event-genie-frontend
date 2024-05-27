import { Layout } from 'antd'

import CreateProfilePage from '@/components/(website)/pages/create-profile'

export default function Home() {
   return (
      <Layout className="flex w-full min-h-screen  flex-col items-center justify-between md:px-16 p-4">
         <CreateProfilePage />
      </Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'Event Genie - Home',
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
