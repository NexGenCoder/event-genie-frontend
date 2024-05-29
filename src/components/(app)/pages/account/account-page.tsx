'use client'
import React from 'react'

import UserAccount from '@/components/(app)/pages/account'
import ProfileSidebar from '@/components/(app)/sidebar/profile'

import AppPageComponent from '../../reusuable/app-page-component'

interface AccountPageProps {
   eventid: string
}

function AccountPage({ eventid }: AccountPageProps) {
   const [open, setOpen] = React.useState(false)
   return (
      <AppPageComponent
         eventid={eventid}
         title="Account"
         open={open}
         setOpen={setOpen}
         sidebar={<ProfileSidebar eventid={eventid} />}
         mainsection={
            <UserAccount eventid={eventid} onBack={() => setOpen(!open)} />
         }
      />
   )
}

export default AccountPage
