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

const sampleChannels = [
   {
      category: 'Text Channels',
      channels: [
         { channelid: 'welcome', name: 'Welcome', icon: 'pray' },
         { channelid: 'general', name: 'General', icon: 'text' },
         { channelid: 'help', name: 'Help & Support', icon: 'help' },
      ],
   },
   {
      category: 'Vendors',
      channels: [{ channelid: 'vendor1', name: 'Vendor 1', icon: 'pray' }],
   },
   {
      category: 'Custom Channels',
      channels: [
         { channelid: 'custom1', name: 'Custom Channel 1', icon: 'text' },
      ],
   },
   {
      category: 'Voice Channels',
      channels: [
         { channelid: 'voice1', name: 'Voice Channel 1', icon: 'voice' },
      ],
   },
]

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
            defaultSelectedKeys={
               sampleChannels.map((group) => group.channels[0].channelid) || []
            }
            className="h-full border-l border-gray-200"
            defaultOpenKeys={sampleChannels.map((group) =>
               group.category.toLowerCase().replace(' ', '-'),
            )}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={sampleChannels.map((group) => ({
               key: group.category.toLowerCase().replace(' ', '-'),
               label: group.category,
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
