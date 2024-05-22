import React, { useState } from 'react'
import {
   Button,
   Flex,
   Modal,
   Tooltip,
   theme,
   Typography,
   Dropdown,
   Avatar,
} from 'antd'
import { IoMdAdd } from 'react-icons/io'
import { MdPersonAdd } from 'react-icons/md'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import Image from 'next/image'
const { Text } = Typography

const EventSwitch = () => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <Dropdown
         arrow={{ pointAtCenter: true }}
         placement="topLeft"
         overlay={
            <Flex
               vertical
               className="p-2 rounded-md"
               style={{ backgroundColor: colorBgContainer }}
            >
               <Button
                  type="text"
                  className="flex items-center justify-center p-"
                  icon={
                     <Image
                        src="/app/wedding-event.png"
                        alt="logo"
                        width={25}
                        height={25}
                     />
                  }
               >
                  <Text className="text-xs truncate line-clamp-1 w-24">
                     Deepak Wedding
                  </Text>
               </Button>
               <Button
                  type="text"
                  className="flex items-center justify-center p-4"
                  icon={<IoMdAdd color={colorTextBase} />}
               >
                  <Text className="text-xs">Create Event</Text>
               </Button>
            </Flex>
         }
      >
         <Flex
            vertical
            align="center"
            justify="center"
            style={{ backgroundColor: colorBgContainer }}
            className={`rounded-xl p-2 cursor-pointer border
            `}
         >
            <Avatar
               size={50}
               shape="square"
               src={
                  <Image
                     src="/app/wedding-event.png"
                     alt="logo"
                     width={50}
                     height={50}
                  />
               }
            />
         </Flex>
      </Dropdown>
   )
}

export default EventSwitch
