import UserAccount from '@/components/(app)/pages/account'
import UserHome from '@/components/(app)/pages/home'
import HomeSidebar from '@/components/(app)/sidebar/home'
import Menus from '@/components/(app)/sidebar/menu'
import { Flex, Layout } from 'antd'
import React from 'react'

interface UserHomePageProps {
   params: {
      userid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus userid={params.userid} />
               <HomeSidebar userid={params.userid} />
            </Flex>
            <UserHome />
         </Flex>
      </Layout>
   )
}

export default UserHomePage
