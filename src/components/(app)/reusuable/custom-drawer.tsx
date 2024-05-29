import { Button, Layout, Typography } from 'antd'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'

const { Title } = Typography

interface DrawerProps {
   children: ReactNode
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
   title?: string
}

const CustomDrawer = ({ children, isOpen, setIsOpen, title }: DrawerProps) => {
   const [startX, setStartX] = useState<number | null>(null)
   const drawerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const handleTouchStart = (e: TouchEvent) => {
         setStartX(e.touches[0].clientX)
      }

      const handleTouchMove = (e: TouchEvent) => {
         if (startX !== null) {
            const currentX = e.touches[0].clientX
            const diffX = currentX - startX

            // Determine swipe direction
            if (diffX > 50) {
               // Swiped right
               setIsOpen(true)
            } else if (diffX < -50) {
               // Swiped left
               setIsOpen(false)
            }
         }
      }

      const handleTouchEnd = () => {
         setStartX(null)
      }

      const drawerElement = drawerRef.current
      if (drawerElement) {
         drawerElement.addEventListener('touchstart', handleTouchStart)
         drawerElement.addEventListener('touchmove', handleTouchMove)
         drawerElement.addEventListener('touchend', handleTouchEnd)
      }

      return () => {
         if (drawerElement) {
            drawerElement.removeEventListener('touchstart', handleTouchStart)
            drawerElement.removeEventListener('touchmove', handleTouchMove)
            drawerElement.removeEventListener('touchend', handleTouchEnd)
         }
      }
   }, [startX, setIsOpen])

   return (
      <Layout
         ref={drawerRef}
         className={
            'fixed overflow-hidden z-50 bg-opacity-25 inset-0 transform ease-in-out h-screen ' +
            (isOpen
               ? 'transition-opacity opacity-100 duration-500 -translate-x-0'
               : 'transition-all delay-300 opacity-0 -translate-x-full')
         }
      >
         <Layout
            className={
               'w-screen max-w-md left-0 absolute h-full shadow-xl delay-300 duration-300 ease-in-out transition-all transform ' +
               (isOpen ? '-translate-x-0' : '-translate-x-full')
            }
         >
            <Layout className="relative w-screen max-w-md pb-10 flex flex-col overflow-y-scroll h-full">
               <div className="flex justify-between items-center px-4 py-2">
                  <Title level={3}>{title}</Title>
                  <Button
                     type="text"
                     onClick={() => {
                        setIsOpen(false)
                     }}
                     className="text-2xl"
                     icon={<IoClose />}
                  />
               </div>
               {children}
            </Layout>
         </Layout>
         <section
            className="w-screen h-full cursor-pointer"
            onClick={() => {
               setIsOpen(false)
            }}
         ></section>
      </Layout>
   )
}

export default CustomDrawer
