'use client'
import { Button, Layout, Result, Spin, Typography } from 'antd'
import React from 'react'

import { useGetVendorsQuery } from '@/app/services/vendorsApi'
import VendorCard from '@/components/vendors/vendor-card'

const { Title } = Typography

function VendorList() {
   const { data: vendorList, isLoading, isError } = useGetVendorsQuery()
   console.log('🚀 ~ VendorList ~ vendorList:', vendorList)

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />
   if (isLoading)
      return (
         <Layout className="flex items-center justify-center w-full h-screen">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (isError) {
      return (
         <Layout className="w-full flex flex-col gap-4 items-center p-6 h-screen">
            <Title level={2}>Failed to load event types</Title>
         </Layout>
      )
   }

   if (!vendorList) {
      return (
         <Layout className="w-full flex flex-col gap-4 items-center p-6">
            <Result
               status="500"
               title="Failed to load vendors"
               subTitle="Please try again later"
               extra={
                  <Button
                     type="primary"
                     onClick={() => window.location.reload()}
                  >
                     Reload
                  </Button>
               }
            />
         </Layout>
      )
   }

   return (
      <div className="w-full flex gap-4 flex-wrap justify-center">
         {vendorList && vendorList.data && (
            <>
               {vendorList.data.map((vendor) => (
                  <VendorCard key={vendor.vendorid} vendorInfo={vendor} />
               ))}
            </>
         )}
      </div>
   )
}

export default VendorList
