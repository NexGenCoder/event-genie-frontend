import React from 'react'

import DirectMessagePage from '@/components/(app)/pages/dms/dms-page'

interface DMsPageProps {
   params: {
      eventid: string
   }
}

function page({ params }: DMsPageProps) {
   return <DirectMessagePage eventid={params.eventid} />
}

export default page
