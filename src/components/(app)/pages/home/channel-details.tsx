import { Button, Flex, Image, Space, theme, Typography } from 'antd'
import React from 'react'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { FaPrayingHands, FaStore } from 'react-icons/fa'
import { GiCook } from 'react-icons/gi'
import { HiLightBulb } from 'react-icons/hi'
import { IoMdHelp } from 'react-icons/io'
import { IoArrowBack, IoSearch } from 'react-icons/io5'
import {
   MdLocationOn,
   MdMusicNote,
   MdOutlineEventSeat,
   MdTextsms,
} from 'react-icons/md'
import { RiChatVoiceFill } from 'react-icons/ri'

import { IChannel } from '@/types/channel'

const { Text } = Typography

interface ChannelDetailsProps {
   channelDetails: IChannel
   onBack?: () => void
   onSearch?: () => void
}

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

const ChannelDetails = ({
   channelDetails,
   onBack,
   onSearch,
}: ChannelDetailsProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <Flex className="top-0 left-0 w-full p-2 shadow-md" vertical>
         <Flex
            gap="small"
            justify="space-between"
            align="center"
            style={{ width: '100%' }}
         >
            <Flex gap="small" align="center">
               <Space className="md:hidden flex">
                  <Button
                     type="text"
                     className="text-2xl"
                     icon={<IoArrowBack />}
                     title="Back"
                     onClick={onBack}
                  />
               </Space>

               <Flex gap="small" align="center" className="w-full">
                  <Text className="text-3xl flex justify-center items-center">
                     {iconMap[channelDetails.icon]}
                  </Text>
                  <Text strong className="capitalize">
                     {channelDetails.name}
                  </Text>
               </Flex>
            </Flex>
            <Button
               type="text"
               className="text-2xl"
               icon={<IoSearch />}
               title="Search"
               onClick={onSearch}
            />
         </Flex>
      </Flex>
   )
}

export default ChannelDetails
