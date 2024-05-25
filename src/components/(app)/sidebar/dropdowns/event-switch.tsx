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

const data = {
   eventid: 'c26b615f-542c-45e6-8810-1a0cb1864dee',
   parent_eventid: null,
   event_name: 'Deepak Birthday',
   start_date_time: '2024-05-29T18:30:00.000Z',
   end_date_time: '2024-05-30T18:30:00.000Z',
   description: 'Deepak Birthday Party',
   event_logo:
      'https://res.cloudinary.com/dspyieeio/image/upload/v1716530846/birthday-cake-svgrepo-com_r0qxre.svg',
   location: 'Patna Bihar',
   event_type: 'Birthday',
   created_at: '2024-05-25T04:54:13.112Z',
   updated_at: '2024-05-25T04:54:13.112Z',
   userid: '1a0d90a5-9b34-4d80-a9b2-f9cf1256ff6e',
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
