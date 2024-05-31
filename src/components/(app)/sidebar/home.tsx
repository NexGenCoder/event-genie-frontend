'use client'
import { Layout, Menu, theme } from 'antd'
import { on } from 'events'
import Link from 'next/link'
import React from 'react'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { FaPrayingHands, FaStore } from 'react-icons/fa'
import { GiCook } from 'react-icons/gi'
import { HiLightBulb } from 'react-icons/hi'
import { IoMdHelp } from 'react-icons/io'
import {
   MdLocationOn,
   MdMusicNote,
   MdOutlineEventSeat,
   MdTextsms,
} from 'react-icons/md'
import { RiChatVoiceFill } from 'react-icons/ri'

import { IChannelCategoryList } from '@/types/channel'

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
interface HomeSidebarProps {
   eventid: string
   channelList: IChannelCategoryList[]
   onBack?: () => void
}

const HomeSidebar = ({ eventid, channelList, onBack }: HomeSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[230px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            className="h-full border-l border-gray-200"
            defaultOpenKeys={channelList.map((group) =>
               group.name.toLowerCase().replace(' ', '-'),
            )}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={channelList.map((group) => ({
               key: group.name.toLowerCase().replace(' ', '-'),
               label: group.name,
               type: 'group',
               children: group.channels.map((channel) => ({
                  key: channel.channelid,
                  icon: iconMap[channel.icon],
                  label: (
                     <Link
                        href={`/app/${eventid}?channel=${channel.channelid}`}
                     >
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
