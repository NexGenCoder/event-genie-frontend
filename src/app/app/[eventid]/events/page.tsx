import React from 'react'

import UserSubeventPage from '@/components/(app)/pages/events/user-subevent-page'

interface DMsPageProps {
   params: {
      eventid: string
   }
}

function DMsPage({ params }: DMsPageProps) {
   return <UserSubeventPage eventid={params.eventid} />
}

export default DMsPage
