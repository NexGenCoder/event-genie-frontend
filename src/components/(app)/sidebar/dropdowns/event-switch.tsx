import { Avatar, Dropdown, Flex, theme, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { IEvent } from '@/types/event'

import type { MenuProps } from 'antd'
const { Text } = Typography

interface EventSwitchProps {
   userEvents: IEvent[]
   eventDetails: IEvent
}

const EventSwitch = ({ userEvents, eventDetails }: EventSwitchProps) => {
   const router = useRouter()
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const items: MenuProps['items'] = userEvents.map((event) => ({
      key: event.eventid,
      label: event.event_name,
      className: event.eventid === eventDetails.eventid ? 'shadow-md' : '',
      icon: (
         <Image
            src={event.event_logo}
            alt={event.event_name}
            width={25}
            height={25}
         />
      ),
      onClick: () => {
         router.push(`/app/${event.eventid}`)
      },
   }))
   return (
      <Dropdown
         arrow={{ pointAtCenter: true }}
         placement="topLeft"
         menu={{ items }}
      >
         <Tooltip title={eventDetails.event_name} placement="right">
            <Flex
               vertical
               align="center"
               justify="center"
               style={{ backgroundColor: colorBgContainer }}
               className="rounded-xl p-2 cursor-pointer shadow-md hover:shadow-lg"
               onClick={(e) => router.push(`/app/${eventDetails.eventid}`)}
            >
               <Avatar
                  size={40}
                  shape="square"
                  src={
                     <Image
                        src={eventDetails.event_logo}
                        alt="logo"
                        width={40}
                        height={40}
                     />
                  }
               />
            </Flex>
         </Tooltip>
      </Dropdown>
   )
}

export default EventSwitch
