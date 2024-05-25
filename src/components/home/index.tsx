'use client'
import React from 'react'
import UserEvents from './user-events'
import CreateButtons from './create-buttons'
import { useGetUserEventsQuery } from '@/app/services/eventsApi'
import { Layout } from 'antd'

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
