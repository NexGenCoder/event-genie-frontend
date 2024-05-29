'use client'
import '../globals.css'

import { ConfigProvider, FloatButton, theme, Tooltip } from 'antd'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { CiLight } from 'react-icons/ci'
import { MdDarkMode } from 'react-icons/md'
import { Provider } from 'react-redux'

import { store } from '@/app/store'
import Navbar from '@/components/(website)/navbar'

const inter = Inter({ subsets: ['latin'] })

const rtkStore = store()
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const { defaultAlgorithm, darkAlgorithm } = theme
   const [isDarkMode, setIsDarkMode] = useState(false)

   return (
      <html lang="en">
         <body className={inter.className}>
            <Provider store={rtkStore}>
               <ConfigProvider
                  theme={{
                     algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                  }}
               >
                  <Navbar />
                  {children}
                  <Tooltip
                     title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                     placement="left"
                  >
                     <FloatButton
                        shape="square"
                        type="default"
                        style={{ right: 94 }}
                        icon={isDarkMode ? <CiLight /> : <MdDarkMode />}
                        onClick={() => setIsDarkMode(!isDarkMode)}
                     />
                  </Tooltip>
               </ConfigProvider>
            </Provider>
         </body>
      </html>
   )
}
