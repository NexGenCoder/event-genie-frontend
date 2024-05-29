'use client'
import '../globals.css'

import { ConfigProvider, theme } from 'antd'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'

const inter = Inter({ subsets: ['latin'] })

const rtkStore = store()
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const { defaultAlgorithm, darkAlgorithm } = theme
   const [isDarkMode, setIsDarkMode] = useState(true)

   return (
      <html lang="en">
         <body className={inter.className}>
            <Provider store={rtkStore}>
               <ConfigProvider
                  theme={{
                     algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                  }}
               >
                  {children}
               </ConfigProvider>
            </Provider>
         </body>
      </html>
   )
}
