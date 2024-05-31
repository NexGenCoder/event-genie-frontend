import { Layout } from 'antd'
import React from 'react'

import VendorOnboarding from '@/components/join-as-vendor'

const VendorOnboardingPage = () => {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
         <VendorOnboarding />
      </Layout>
   )
}

export default VendorOnboardingPage
