import { Layout } from 'antd'
import React from 'react'

import VendorOnboarding from '@/components/(website)/pages/join-as-vendor'

const VendorOnboardingPage = () => {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
         <VendorOnboarding />
      </Layout>
   )
}

export default VendorOnboardingPage

export function generateMetadata() {
   return {
      title: 'Vendor Onboarding - Event Genie',
      description:
         "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
      image: '/next.svg',
      url: 'http://eg.gittrackr.engineer/join-as-vendor',
      keywords:
         'events, event planning, social events, local events, event discovery',
      author: 'Event Genie Team',
      openGraph: {
         type: 'website',
         url: 'http://eg.gittrackr.engineer/join-as-vendor',
         title: 'Vendor Onboarding - Event Genie',
         description:
            "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
         image: '/next.svg',
      },
      twitter: {
         card: 'summary_large_image',
         site: '@eventgenie',
         title: 'Vendor Onboarding - Event Genie',
         description:
            "Join Event Genie as a vendor and start creating events that you'll love. Connect with like-minded individuals and create memorable experiences.",
         image: '/next.svg',
      },
   }
}
