import { Layout } from 'antd'

import VendorList from '@/components/(website)/pages/vendors/vendor-list'

export default function Home() {
   return (
      <Layout className="w-full flex flex-col items-center justify-center p-6">
         <VendorList />
      </Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'Vendors - Event Genie',
      description:
         'Explore the vendors that are part of the Getogether platform.',
      image: '/next.svg',
      url: 'http://eg.gittrackr.engineer/vendors',
   }
}
