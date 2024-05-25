import { Avatar, Dropdown, Flex, theme, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { IEvent } from '@/types/event'

import type { MenuProps } from 'antd'
const { Text } = Typography

interface EventSwitchProps {
   userEvents: IEvent[]
}

const EventSwitch = ({ userEvents }: EventSwitchProps) => {
   const router = useRouter()
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const items: MenuProps['items'] = userEvents.map((event) => ({
      key: event.eventid,
      label: event.event_name,
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
         trigger={['click']}
         menu={{ items }}
      >
         <Flex
            vertical
            align="center"
            justify="center"
            style={{ backgroundColor: colorBgContainer }}
            className="rounded-xl p-2 cursor-pointer border"
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
