'use client'
import { Layout, Typography } from 'antd'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { useGetUserEventsQuery } from '@/app/services/eventsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import CreateSubEvent from './create-sub-event'
import EventDetails from './event-details'
import UserDetails from './user-details'

const { Title } = Typography
interface UserAccountProps {
   eventid: string
   onBack: () => void
}

function UserAccount({ eventid, onBack }: UserAccountProps) {
   const [searchParams] = useSearchParams()
   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()
   return (
      <Layout className="w-full h-screen overflow-y-auto">
         {searchParams && searchParams[1] === 'profile' ? (
            <>{userData && <UserDetails user={userData} onBack={onBack} />}</>
         ) : searchParams && searchParams[1] === 'events' ? (
            <EventDetails eventid={eventid} onBack={onBack} />
         ) : searchParams && searchParams[1] === 'create-event' ? (
            <CreateSubEvent parentId={eventid} onBack={onBack} />
         ) : searchParams && searchParams[1] === 'theme' ? (
            <Title>Theme</Title>
         ) : searchParams && searchParams[1] === 'language' ? (
            <Title>Language</Title>
         ) : searchParams && searchParams[1] === 'country' ? (
            <Title>Country</Title>
         ) : searchParams && searchParams[1] === 'delete-account' ? (
            <Title>Delete Account</Title>
         ) : (
            <>{userData && <UserDetails user={userData} onBack={onBack} />}</>
         )}
      </Layout>
   )
}

export default UserAccount
