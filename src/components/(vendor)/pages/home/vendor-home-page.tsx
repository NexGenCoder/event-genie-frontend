'use client'
import { Button, Layout, Result, Spin } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { useGetVendorQuery } from '@/app/services/vendorsApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AppPageComponent from '../../reusuable/app-page-component'
import VendorHomeSidebar from '../../sidebar/VendorHomeSidebar'
import UserHome from './'

interface UserHomePageProps {
   vendorid: string
}

function VendorHomePage({ vendorid }: UserHomePageProps) {
   const { data: vendorDetails, isLoading: isVendorDataFetching } =
      useGetVendorQuery()
   const [searchParam] = useSearchParams()
   const [open, setOpen] = useState(false)
   const { data: userData, isLoggedin } = useIsAuthenticated()

   const router = useRouter()

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isVendorDataFetching)
      return (
         <Layout className="flex items-center justify-center w-full min-h-screen">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (!vendorDetails) {
      return (
         <Layout className="relative w-full min-h-screen flex flex-col justify-center">
            <Result
               status="404"
               title="Vendor details not found"
               subTitle="Looks like the you are not a registered vendor, click below to register as a vendor"
               extra={
                  <Button type="primary" href="/join-as-vendor">
                     Register as vendor
                  </Button>
               }
            />
         </Layout>
      )
   }

   if (!isLoggedin) {
      return (
         <Layout className="flex items-center justify-center w-full">
            <Result
               status="403"
               title="You are not logged in"
               subTitle="Please log in to view your events"
               extra={
                  <Button type="primary" href="/login" key="console">
                     Log in
                  </Button>
               }
            />
         </Layout>
      )
   }

   return (
      <AppPageComponent
         vendorid={vendorid}
         title="Home"
         open={open}
         setOpen={setOpen}
         sidebar={
            <VendorHomeSidebar
               vendorid={vendorid}
               onBack={() => setOpen(!open)}
            />
         }
         mainsection={
            !searchParam ? (
               <Layout className="relative w-full min-h-screen flex flex-col justify-center">
                  <Result
                     title="Select a channel"
                     subTitle="Select a channel to start conversation"
                  />
               </Layout>
            ) : (
               userData &&
               searchParam &&
               searchParam[1] && (
                  <UserHome
                     userdata={userData}
                     channelId={searchParam[1]}
                     onBack={() => setOpen(!open)}
                  />
               )
            )
         }
      />
   )
}

export default VendorHomePage
