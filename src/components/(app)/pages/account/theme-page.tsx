import { Flex, Layout, Radio, Space, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setDarkMode } from '@/app/themeSlice'
import { BulbFilled, BulbOutlined, SettingOutlined } from '@ant-design/icons'

import PageDetails from './page-details'

const { Text } = Typography

interface ThemePageProps {
   onBack?: () => void
}

const ThemePage = ({ onBack }: ThemePageProps) => {
   const dispatch = useDispatch()
   const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

   const handleThemeChange = (value: string) => {
      if (value === 'dark') {
         dispatch(setDarkMode(true))
      } else if (value === 'light') {
         dispatch(setDarkMode(false))
      } else {
         const isDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
         ).matches
         dispatch(setDarkMode(isDark))
      }
   }

   return (
      <Layout className="w-full h-screen overflow-y-auto">
         <PageDetails title="Theme" onBack={onBack} />

         <Flex vertical gap="small" className="p-4 h-full">
            <Text strong>Choose Theme</Text>
            <Radio.Group
               onChange={(e) => handleThemeChange(e.target.value)}
               defaultValue={isDarkMode ? 'dark' : 'light'}
            >
               <Radio.Button value="dark">
                  <BulbFilled /> Dark Mode
               </Radio.Button>
               <Radio.Button value="light">
                  <BulbOutlined /> Light Mode
               </Radio.Button>
               <Radio.Button value="system">
                  <SettingOutlined /> System Default
               </Radio.Button>
            </Radio.Group>
         </Flex>
      </Layout>
   )
}

export default ThemePage
