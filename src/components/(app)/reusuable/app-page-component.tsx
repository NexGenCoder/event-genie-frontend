'use client'
import { Flex, Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import Menus from '@/components/(app)/sidebar/menu'

import CustomDrawer from './custom-drawer'

interface AppPageComponentProps {
   eventid: string
   sidebar: React.ReactNode
   mainsection: React.ReactNode
   title: string
   open: boolean
   setOpen: (open: boolean) => void
}

function AppPageComponent({
   eventid,
   sidebar,
   mainsection,
   title,
   open,
   setOpen,
}: AppPageComponentProps) {
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
   }, [setOpen, startX])

   return (
      <Layout ref={layoutRef} className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="md:flex w-[300px] h-full hidden">
               <Menus eventid={eventid} />
               {sidebar}
            </Flex>

            <CustomDrawer isOpen={open} setIsOpen={setOpen} title={title}>
               <Flex className="flex w-full h-full md:hidden">
                  <Menus eventid={eventid} />
                  {sidebar}
               </Flex>
            </CustomDrawer>
            {mainsection}
         </Flex>
      </Layout>
   )
}

export default AppPageComponent
