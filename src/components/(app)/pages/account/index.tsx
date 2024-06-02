'use client'
import { Button, Layout, Result, Typography } from 'antd'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { useGetUserEventsQuery } from '@/app/services/eventsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import CreateSubEvent from './create-sub-event'
import DeleteAccount from './delete-account'
import EventDetails from './event-details'
import CountryAndRegionSelector from './language-country'
import ThemePage from './theme-page'
import UserDetails from './user-details'

const { Title } = Typography
interface UserAccountProps {
   eventid: string
   onBack: () => void
}

function UserAccount({ eventid, onBack }: UserAccountProps) {
   const [searchParams] = useSearchParams()
   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()

   if (!isLoggedin) {
      return (
         <Layout className="flex items-center justify-center w-full">
            <Result
               status="403"
               title="You are not logged in"
               subTitle="Please log in to view your events"
               extra={
                  <Button type="primary" href="/login" key="console">
                     Log in
                  </Button>
               }
            />
         </Layout>
      )
   }

   return (
      <Layout className="w-full h-screen overflow-y-auto">
         {searchParams && searchParams[1] === 'profile' ? (
            <>{userData && <UserDetails user={userData} onBack={onBack} />}</>
         ) : searchParams && searchParams[1] === 'events' ? (
            <EventDetails eventid={eventid} onBack={onBack} />
         ) : searchParams && searchParams[1] === 'create-event' ? (
            <CreateSubEvent parentId={eventid} onBack={onBack} />
         ) : searchParams && searchParams[1] === 'theme' ? (
            <ThemePage onBack={onBack} />
         ) : searchParams && searchParams[1] === 'language' ? (
            <CountryAndRegionSelector />
         ) : searchParams && searchParams[1] === 'country' ? (
            <CountryAndRegionSelector />
         ) : searchParams && searchParams[1] === 'delete-account' ? (
            <DeleteAccount />
         ) : (
            <>{userData && <UserDetails user={userData} onBack={onBack} />}</>
         )}
      </Layout>
   )
}

export default UserAccount
