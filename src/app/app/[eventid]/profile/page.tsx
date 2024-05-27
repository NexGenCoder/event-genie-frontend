import { Flex, Layout, Typography } from 'antd'
import React from 'react'

import UserAccount from '@/components/(app)/pages/account'
import Menus from '@/components/(app)/sidebar/menu'
import ProfileSidebar from '@/components/(app)/sidebar/profile'

interface UserProfilePageProps {
   params: {
      eventid: string
   }
}

function UserProfilePage({ params }: UserProfilePageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus eventid={params.eventid} />
               <ProfileSidebar eventid={params.eventid} />
            </Flex>
            <UserAccount eventid={params.eventid} />
         </Flex>
      </Layout>
   )
}

export default UserProfilePage

export function generateMetadata() {
   return {
      title: 'Profile - Event Genie',
      description:
         "Manage your account settings and preferences. Event Genie is a platform that helps you find and create events that you'll love. Discover events tailored to your interests, connect with like-minded individuals, and create memorable experiences.",
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
