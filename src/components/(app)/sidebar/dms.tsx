'use client'
import { Flex, Image, Layout, Menu, theme } from 'antd'
import Link from 'next/link'
import React from 'react'

interface DMSidebarProps {
   eventid: string
   userList?: any
}

const DMSidebar = ({ eventid, userList }: DMSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-full h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            defaultSelectedKeys={
               userList.length > 0 ? [userList[0].userid] : []
            }
            className="h-full border-l border-gray-200"
            defaultOpenKeys={userList.length > 0 ? [userList[0].userid] : []}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={userList.map((guest: any) => ({
               key: guest.userid,
               label: (
                  <Link href={`/app/${eventid}/dms?dms=${guest.userid}`}>
                     <Flex
                        gap="middle"
                        align="center"
                        style={{ color: colorTextBase }}
                     >
                        <Image
                           src={guest.profile_picture}
                           alt={`${guest.firstname} ${guest.lastname}`}
                           width={20}
                           height={20}
                           className="rounded-full"
                        />
                        {`${guest.firstname} ${guest.lastname}`}{' '}
                        {guest.role === 'host' && '(Host)'}
                        {guest.role === 'vendor' && '(Vendor)'}
                        {guest.role === 'guest' && '(Guest)'}
                     </Flex>
                  </Link>
               ),
            }))}
         />
      </Layout>
   )
}

export default DMSidebar
