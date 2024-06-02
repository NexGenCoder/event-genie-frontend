'use client'
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'
import { GrOverview } from 'react-icons/gr'
import { IoMdNotifications } from 'react-icons/io'

interface VendorHomeSidebarProps {
   vendorid: string
   onBack?: () => void
}

const VendorHomeSidebar = ({ vendorid, onBack }: VendorHomeSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[230px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            defaultSelectedKeys={['view-profile']}
            className="h-full border-l border-gray-200"
            defaultOpenKeys={['profile']}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={[
               {
                  key: 'overview',
                  icon: <GrOverview />,
                  label: (
                     <Link href={`/vendor/${vendorid}?tab=overview`}>
                        Overview
                     </Link>
                  ),
               },
               {
                  key: 'notifications',
                  icon: <IoMdNotifications />,
                  label: (
                     <Link href={`/vendor/${vendorid}?tab=notifications`}>
                        Notifications
                     </Link>
                  ),
               },
               {
                  key: 'messages',
                  icon: <FaMessage />,
                  label: (
                     <Link href={`/vendor/${vendorid}?tab=messages`}>
                        Messages
                     </Link>
                  ),
               },
            ]}
         />
      </Layout>
   )
}

export default VendorHomeSidebar
