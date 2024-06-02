'use client'
import '../globals.css'

import { ConfigProvider, theme } from 'antd'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { RootState, store } from '@/app/store'
import { initializeTheme } from '@/app/themeSlice'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
   children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
   const { defaultAlgorithm, darkAlgorithm } = theme
   const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initializeTheme())
   }, [dispatch])

   return (
      <html lang="en">
         <body className={inter.className}>
            <ConfigProvider
               theme={{
                  algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
               }}
            >
               {children}
            </ConfigProvider>
         </body>
      </html>
   )
}

const App = ({ children }: RootLayoutProps) => {
   return (
      <Provider store={store()}>
         <RootLayout>{children}</RootLayout>
      </Provider>
   )
}

export default App
