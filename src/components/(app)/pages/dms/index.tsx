'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Typography } from 'antd'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

const { Title } = Typography

interface UserAccountProps {
   channelid: string
}
function UserAccount({ channelid }: UserAccountProps) {
   const [searchParams] = useSearchParams()

   return (
      <div className="w-full">
         {searchParams && searchParams[1] === 'edit-profile' ? (
            <Title>Profile</Title>
         ) : searchParams && searchParams[1] === 'profile' ? (
            <Title>Profile</Title>
         ) : searchParams && searchParams[1] === 'events' ? (
            <Title>Events</Title>
         ) : searchParams && searchParams[1] === 'create-event' ? (
            <Title>Create Event</Title>
         ) : searchParams && searchParams[1] === 'theme' ? (
            <Title>Theme</Title>
         ) : searchParams && searchParams[1] === 'language' ? (
            <Title>Language</Title>
         ) : searchParams && searchParams[1] === 'country' ? (
            <Title>Country</Title>
         ) : searchParams && searchParams[1] === 'delete-account' ? (
            <Title>Delete Account</Title>
         ) : (
            <Title>Profile</Title>
         )}
      </div>
   )
}

export default UserAccount