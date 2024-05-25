'use client'
import { Layout } from 'antd'
import React from 'react'

import { useGetUserEventsQuery } from '@/app/services/eventsApi'

import CreateButtons from './create-buttons'
import UserEvents from './user-events'

function HomePageHero() {
   const { data: userEvents } = useGetUserEventsQuery()
   return (
      <Layout className="flex md:flex-row flex-col gap-4 items-center w-full">
         {userEvents && <UserEvents events={userEvents.data} />}
         <CreateButtons />
      </Layout>
   )
}

export default HomePageHero
