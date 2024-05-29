'use client'
import { Button, Flex, Layout, Result, Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

import {
   useGetEventChannelsQuery,
   useGetEventDetailsQuery,
} from '@/app/services/eventsApi'
import UserHome from '@/components/(app)/pages/home'
import HomeSidebar from '@/components/(app)/sidebar/home'
import Menus from '@/components/(app)/sidebar/menu'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import CustomDrawer from '../../sidebar/custom-drawer'

interface UserHomePageProps {
   eventid: string
}

function UserHomePage({ eventid }: UserHomePageProps) {
   const { data: channelList, isLoading: isEventChannelsFetching } =
      useGetEventChannelsQuery(eventid)
   const { data: eventData, isLoading: isEventDataFetching } =
      useGetEventDetailsQuery(eventid)
   const [searchParam] = useSearchParams()
   const { data: userData } = useIsAuthenticated()
   const [open, setOpen] = useState(false)
   const [startX, setStartX] = useState<number | null>(null)
   const layoutRef = useRef<HTMLDivElement>(null)

   const router = useRouter()
   useEffect(() => {
      if (channelList && channelList?.data) {
         router.push(
            `/app/${eventid}?channelid=${channelList.data[0].channels[0].channelid}`,
         )
      }
   }, [channelList, eventid, router])

   useEffect(() => {
      const handleTouchStart = (e: TouchEvent) => {
         setStartX(e.touches[0].clientX)
      }

      const handleTouchMove = (e: TouchEvent) => {
         if (startX !== null) {
            const currentX = e.touches[0].clientX
            const diffX = currentX - startX

            if (diffX > 50) {
               setOpen(true)
            } else if (diffX < -50) {
               setOpen(false)
            }
         }
      }

      const handleTouchEnd = () => {
         setStartX(null)
      }

      const layoutElement = layoutRef.current
      if (layoutElement) {
         layoutElement.addEventListener('touchstart', handleTouchStart)
         layoutElement.addEventListener('touchmove', handleTouchMove)
         layoutElement.addEventListener('touchend', handleTouchEnd)
      }

      return () => {
         if (layoutElement) {
            layoutElement.removeEventListener('touchstart', handleTouchStart)
            layoutElement.removeEventListener('touchmove', handleTouchMove)
            layoutElement.removeEventListener('touchend', handleTouchEnd)
         }
      }
   }, [startX])

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isEventChannelsFetching && isEventDataFetching)
      return (
         <Layout className="flex items-center justify-center w-full min-h-screen">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (!eventData) {
      return (
         <Layout className="relative w-full min-h-screen flex flex-col justify-center">
            <Result
               status="404"
               title="Event not found"
               subTitle="Sorry, the event you are looking for does not exist."
               extra={
                  <Button type="primary" onClick={() => router.push('/')}>
                     Back Home
                  </Button>
               }
            />
         </Layout>
      )
   }

   return (
      <Layout ref={layoutRef} className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="md:flex w-[300px] h-full hidden">
               <Menus eventid={eventid} />

               {channelList?.data && (
                  <HomeSidebar
                     eventid={eventid}
                     channelList={channelList?.data}
                  />
               )}
            </Flex>
            <CustomDrawer isOpen={open} setIsOpen={setOpen} title="Chats">
               <Flex className="flex w-full h-full md:hidden">
                  <Menus eventid={eventid} />

                  {channelList?.data && (
                     <HomeSidebar
                        onBack={() => setOpen(!open)}
                        eventid={eventid}
                        channelList={channelList?.data}
                     />
                  )}
               </Flex>
            </CustomDrawer>

            {!searchParam ? (
               <Layout className="relative w-full min-h-screen flex flex-col justify-center">
                  <Result
                     title="Select a channel"
                     subTitle="Select a channel to start conversation"
                  />
               </Layout>
            ) : (
               userData &&
               searchParam &&
               searchParam[1] && (
                  <UserHome
                     userdata={userData}
                     channelId={searchParam[1]}
                     onBack={() => setOpen(!open)}
                  />
               )
            )}
         </Flex>
      </Layout>
   )
}

export default UserHomePage
