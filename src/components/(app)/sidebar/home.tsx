'use client'
import React from 'react'
import { MdTextsms } from 'react-icons/md'
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link'
import { FaPrayingHands } from 'react-icons/fa'
import { IoMdHelp } from 'react-icons/io'
import { RiChatVoiceFill } from 'react-icons/ri'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { GiCook } from 'react-icons/gi'
import { MdMusicNote } from 'react-icons/md'
import { HiLightBulb } from 'react-icons/hi'
import { MdLocationOn } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import { MdOutlineEventSeat } from 'react-icons/md'

const iconMap: { [key: string]: JSX.Element } = {
   pray: <FaPrayingHands />,
   text: <MdTextsms />,
   help: <IoMdHelp />,
   voice: <RiChatVoiceFill />,
   camera: <BsFillCameraReelsFill />,
   cook: <GiCook />,
   music: <MdMusicNote />,
   plan: <HiLightBulb />,
   venue: <MdLocationOn />,
   vendor: <FaStore />,
   decor: <MdOutlineEventSeat />,
}
const sampleChannelList = {
   message: 'Channel list retrieved successfully',
   data: [
      {
         categoryid: 'cat1',
         eventid: 'event1',
         name: 'Text Channels',
         isPrivate: false,
         channels: [
            { channelid: 'ch1', name: 'Welcome', icon: 'pray' },
            { channelid: 'ch2', name: 'General', icon: 'text' },
            { channelid: 'ch3', name: 'Help & Support', icon: 'help' },
         ],
      },
      {
         categoryid: 'cat2',
         eventid: 'event1',
         name: 'Vendors',
         isPrivate: false,
         channels: [{ channelid: 'ch4', name: 'Vendor 1', icon: 'vendor' }],
      },
      {
         categoryid: 'cat3',
         eventid: 'event1',
         name: 'Custom Channels',
         isPrivate: false,
         channels: [
            { channelid: 'ch5', name: 'Custom Channel 1', icon: 'text' },
         ],
      },
      {
         categoryid: 'cat4',
         eventid: 'event1',
         name: 'Voice Channels',
         isPrivate: false,
         channels: [
            { channelid: 'ch6', name: 'Voice Channel 1', icon: 'voice' },
         ],
      },
   ],
}

interface HomeSidebarProps {
   userid: string
}

const HomeSidebar = ({ userid }: HomeSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[200px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            className="h-full border-l border-gray-200"
            defaultOpenKeys={sampleChannelList.data.map((group) =>
               group.name.toLowerCase().replace(' ', '-'),
            )}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={sampleChannelList.data.map((group) => ({
               key: group.name.toLowerCase().replace(' ', '-'),
               label: group.name,
               type: 'group',
               children: group.channels.map((channel) => ({
                  key: channel.channelid,
                  icon: iconMap[channel.icon],
                  label: (
                     <Link href={`/app/${userid}?channel=${channel.channelid}`}>
                        {channel.name}
                     </Link>
                  ),
               })),
            }))}
         />
      </Layout>
   )
}

export default HomeSidebar
