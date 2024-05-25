'use client'
import { Typography } from 'antd'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import ProfileForm from './profile-form'

const { Title } = Typography

function UserAccount() {
   const [searchParams] = useSearchParams()
   const { isLoggedin, data: userData, isLoading } = useIsAuthenticated()

   return (
      <div className="w-full">
         {searchParams && searchParams[1] === 'edit-profile' ? (
            <>{userData && <ProfileForm userData={userData} />}</>
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
