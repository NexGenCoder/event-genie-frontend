import { Flex, Layout, Typography } from 'antd'
import React from 'react'

import UserAccount from '@/components/(app)/pages/account'
import Menus from '@/components/(app)/sidebar/menu'
import ProfileSidebar from '@/components/(app)/sidebar/profile'

const { Title } = Typography

interface UserHomePageProps {
   params: {
      eventid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus eventid={params.eventid} />
               <ProfileSidebar eventid={params.eventid} />
            </Flex>
            <UserAccount />
         </Flex>
      </Layout>
   )
}

export default UserHomePage
