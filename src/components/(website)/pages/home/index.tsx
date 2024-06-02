'use client'
import { Layout } from 'antd'
import React from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import CreateButtons from './create-buttons'
import FrequentlyAskQuestion from './faq'
import HeroSection from './hero'

function HomePageHero() {
   const { isLoggedin } = useIsAuthenticated()
   return (
      <Layout className="flex flex-col gap-4 items-center w-full">
         {isLoggedin && <CreateButtons />}

         <HeroSection />
         <FrequentlyAskQuestion />
      </Layout>
   )
}

export default HomePageHero
