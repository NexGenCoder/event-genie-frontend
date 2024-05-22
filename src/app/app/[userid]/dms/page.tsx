import UserAccount from '@/components/(app)/pages/account'
import DMSidebar from '@/components/(app)/sidebar/dms'
import Menus from '@/components/(app)/sidebar/menu'
import { Flex, Layout } from 'antd'
import React from 'react'

interface DMsPageProps {
   params: {
      userid: string
   }
}

function DMsPage({ params }: DMsPageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus userid={params.userid} />
               <DMSidebar userid={params.userid} />
            </Flex>
            <UserAccount />
         </Flex>
      </Layout>
   )
}

export default DMsPage
