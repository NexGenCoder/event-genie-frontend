'use client'
import { Layout } from 'antd'
import React from 'react'

import CreateButtons from './create-buttons'

function HomePageHero() {
   return (
      <Layout className="flex md:flex-row flex-col gap-4 items-center w-full">
         <CreateButtons />
      </Layout>
   )
}

export default HomePageHero
