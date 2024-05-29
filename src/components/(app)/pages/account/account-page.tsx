'use client'
import { Flex, Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import UserAccount from '@/components/(app)/pages/account'
import CustomDrawer from '@/components/(app)/sidebar/custom-drawer'
import Menus from '@/components/(app)/sidebar/menu'
import ProfileSidebar from '@/components/(app)/sidebar/profile'

interface AccountPageProps {
   eventid: string
}

function AccountPage({ eventid }: AccountPageProps) {
   const [open, setOpen] = useState(false)
   const [startX, setStartX] = useState<number | null>(null)
   const layoutRef = useRef<HTMLDivElement>(null)

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

   return (
      <Layout ref={layoutRef} className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="md:flex w-[300px] h-full hidden">
               <Menus eventid={eventid} />
               <ProfileSidebar eventid={eventid} />
            </Flex>

            <CustomDrawer isOpen={open} setIsOpen={setOpen} title="Account">
               <Flex className="flex w-full h-full md:hidden">
                  <Menus eventid={eventid} />
                  <ProfileSidebar eventid={eventid} />
               </Flex>
            </CustomDrawer>
            <UserAccount eventid={eventid} onBack={() => setOpen(!open)} />
         </Flex>
      </Layout>
   )
}

export default AccountPage
