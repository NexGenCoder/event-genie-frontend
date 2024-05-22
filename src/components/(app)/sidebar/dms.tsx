'use client'
import React from 'react'
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link'
import Image from 'next/image'

const sampleChannels = [
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
   userid: string
}

const DMSidebar = ({ userid }: DMSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[200px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            defaultSelectedKeys={
               sampleChannels.length > 0 ? [sampleChannels[0].userid] : []
            }
            className="h-full border-l border-gray-200"
            defaultOpenKeys={
               sampleChannels.length > 0 ? [sampleChannels[0].userid] : []
            }
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={sampleChannels.map((channel) => ({
               key: channel.userid,
               label: (
                  <Link href={`/app/${userid}/dms?dms=${channel.userid}`}>
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
