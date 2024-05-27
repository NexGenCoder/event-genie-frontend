'use client'
import { Avatar, Flex, Layout, theme, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsChatSquareFill } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import { IoPeopleSharp } from 'react-icons/io5'
import { MdOutlineEventSeat } from 'react-icons/md'
import { PiChatsFill } from 'react-icons/pi'

import {
   useGetEventCategoriesQuery,
   useGetEventDetailsQuery,
   useGetUserEventsQuery,
} from '@/app/services/eventsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { IEvent } from '@/types/event'

import CreateDropdown from './dropdowns/create-dropdown'
import EventSwitch from './dropdowns/event-switch'

const { Text } = Typography

interface MenusProps {
   eventid: string
}

const Menus = ({ eventid }: MenusProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()
   const { data: userEvents } = useGetUserEventsQuery()
   const { data: eventDetails } = useGetEventDetailsQuery(eventid)

   return (
      <Layout
         className="relative w-[70px] h-full px-2 py-4"
         style={{ backgroundColor: colorBgContainer }}
      >
         <div className="flex flex-col items-center justify-between h-full">
            <Flex
               gap="middle"
               vertical
               className="h-full w-full"
               align="center"
            >
               {userEvents && eventDetails && (
                  <EventSwitch
                     userEvents={userEvents.data}
                     eventDetails={eventDetails.data}
                  />
               )}

               <Link
                  href={`/app/${eventid}`}
                  className="flex flex-col items-center justify-center"
               >
                  <BsChatSquareFill size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Chats</Text>
               </Link>

               <Link
                  href={`/app/${eventid}/dms`}
                  className="flex flex-col items-center justify-center"
               >
                  <PiChatsFill size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">DMs</Text>
               </Link>
               <Link
                  href={`/app/${eventid}/events`}
                  className="flex flex-col items-center justify-center"
               >
                  <MdOutlineEventSeat size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Events</Text>
               </Link>
               <Link
                  href={`/app/${eventid}/guests`}
                  className="flex flex-col items-center justify-center"
               >
                  <IoPeopleSharp size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Guests</Text>
               </Link>
            </Flex>
            <Flex gap="middle" vertical className="w-full" align="center">
               {eventDetails && (
                  <CreateDropdown eventDetails={eventDetails.data} />
               )}
               <Link href={`/app/${eventid}/profile`}>
                  <Tooltip
                     title={
                        userData?.firstname + ' ' + userData?.lastname || 'User'
                     }
                     placement="right"
                  >
                     <Avatar
                        size={50}
                        shape="square"
                        src={
                           <Image
                              src={userData?.profile_picture || '/app/user.jpg'}
                              alt={userData?.username || 'User'}
                              width={50}
                              height={50}
                              className="rounded-xl"
                           />
                        }
                     />
                  </Tooltip>
               </Link>
            </Flex>
         </div>
      </Layout>
   )
}

export default Menus
