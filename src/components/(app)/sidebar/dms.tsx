'use client'
import { Layout, Menu, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const userList = [
   {
      userid: '4646fdfsf46646',
      name: 'Priyanshu Kumar',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
   {
      userid: 'fdsfds4f5ds6f46',
      name: 'Deepak Yadav',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
   {
      userid: 'dsfdsf454654654',
      name: 'Sunny Sahsi',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
]

interface DMSidebarProps {
   eventid: string
   userList?: any
}

const DMSidebar = ({ eventid }: DMSidebarProps) => {
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
            items={userList.map((channel: any) => ({
               key: channel.userid,
               label: (
                  <Link href={`/app/${eventid}/dms?dms=${channel.userid}`}>
                     {channel.name}
                  </Link>
               ),
               icon: (
                  <Image
                     src={channel.profile_picture}
                     alt={channel.name}
                     width={20}
                     height={20}
                  />
               ),
            }))}
         />
      </Layout>
   )
}

export default DMSidebar
