'use client'
import { Avatar, Flex, Layout, theme, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSolidMessageSquareDetail } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaCalendar } from 'react-icons/fa'
import { GrServices } from 'react-icons/gr'
import { IoSettingsSharp } from 'react-icons/io5'
import {
   MdContactSupport,
   MdDashboard,
   MdOutlineManageHistory,
} from 'react-icons/md'
import { TbInvoice } from 'react-icons/tb'

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
   vendorid: string
}

const Menus = ({ vendorid }: MenusProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()
   const { data: userEvents } = useGetUserEventsQuery()
   const { data: eventDetails } = useGetEventDetailsQuery(vendorid)

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
                  href={`/vendor/${vendorid}`}
                  className="flex flex-col items-center justify-center"
               >
                  <MdDashboard size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Dashboard</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/services`}
                  className="flex flex-col items-center justify-center"
               >
                  <GrServices size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Services</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/bookings`}
                  className="flex flex-col items-center justify-center"
               >
                  <MdOutlineManageHistory size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Bookings</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/calendar`}
                  className="flex flex-col items-center justify-center"
               >
                  <FaCalendar size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Calendar</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/invoices`}
                  className="flex flex-col items-center justify-center"
               >
                  <TbInvoice size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Invoices</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/profile`}
                  className="flex flex-col items-center justify-center"
               >
                  <CgProfile size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Profile</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/settings`}
                  className="flex flex-col items-center justify-center"
               >
                  <IoSettingsSharp size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Settings</Text>
               </Link>

               <Link
                  href={`/vendor/${vendorid}/support`}
                  className="flex flex-col items-center justify-center"
               >
                  <MdContactSupport size={26} color={colorTextBase} />
                  <Text className="text-xs text-center">Support</Text>
               </Link>
            </Flex>
         </div>
      </Layout>
   )
}

export default Menus
