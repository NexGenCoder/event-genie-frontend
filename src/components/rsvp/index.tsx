'use client'

import { Layout } from 'antd'
import { useGetUserRsvpQuery } from '@/app/services/rsvpApi'
import UserRsvps from '@/components/rsvp/user-rsvps'
import React from 'react'

function UserRsvp() {
   const { data: userRsvps } = useGetUserRsvpQuery()

   return (
      <Layout className="flex flex-col gap-4 items-center w-full">
         {userRsvps && <UserRsvps rsvps={userRsvps.data} />}
      </Layout>
   )
}

export default UserRsvp
