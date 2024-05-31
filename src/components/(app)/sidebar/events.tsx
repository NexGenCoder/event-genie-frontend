'use client'
import { Button, Flex, Layout, Menu, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'

const sampleChannels = [
   {
      eventid: '4646fdfsf46646',
      eventName: 'Engagement',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
   {
      eventid: 'fdsfds4f5ds6f46',
      eventName: 'Mehandi',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
   {
      eventid: 'dsfdsf4d54654654',
      eventName: 'Sangeet',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxjxv.png',
   },
   {
      eventid: 'dsfdsf4546s54654',
      eventName: 'Tilak',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxv.png',
   },
   {
      eventid: 'dsfdsf45w4654654',
      eventName: 'Haldi',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxv.png',
   },
   {
      eventid: 'dsfdsf4546254654',
      eventName: 'Roka',
      profile_picture:
         'https://res.cloudinary.com/dspyieeio/image/upload/v1716355250/linktree/ydxmbjg3lkgp7yblxv.png',
   },
]

interface EventSidebarProps {
   eventid: string
}

const EventSidebar = ({ eventid }: EventSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[230px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            defaultSelectedKeys={
               sampleChannels.length > 0 ? [sampleChannels[0].eventid] : []
            }
            className="h-full border-l border-gray-200"
            defaultOpenKeys={
               sampleChannels.length > 0 ? [sampleChannels[0].eventid] : []
            }
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={sampleChannels.map((channel) => ({
               key: channel.eventid,
               label: (
                  <Link
                     href={`/app/${eventid}/events?event=${channel.eventid}`}
                  >
                     {channel.eventName}
                  </Link>
               ),
               icon: (
                  <Image
                     src={channel.profile_picture}
                     alt={channel.eventName}
                     width={20}
                     height={20}
                  />
               ),
            }))}
         />
      </Layout>
   )
}

export default EventSidebar
