'use client'
import { Button, Card, Flex, Layout, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import { GrServices } from 'react-icons/gr'
import { IoLocation } from 'react-icons/io5'
import { MdInfo } from 'react-icons/md'

const { Text } = Typography

interface VendorCardProps {
   vendorInfo: {
      vendorid: string
      ownerid: string | null
      brand_name: string
      brand_logo: string
      location: string
      description: string | null
      email: string
      phone: string
      created_at: string
      updated_at: string
   }
}

function VendorCard({ vendorInfo }: VendorCardProps) {
   return (
      <Card
         hoverable
         style={{ width: 300 }}
         className="flex flex-col justify-between h-fit shadow-md rounded-lg"
      >
         <Layout>
            <div className="relative w-full h-48">
               <Image
                  alt={vendorInfo.brand_name}
                  src="/vendor/services/IMG-20221114-WA0003.jpg"
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover aspect-square rounded-t-lg"
               />
               {vendorInfo.description && (
                  <Tooltip title={vendorInfo.description}>
                     <MdInfo
                        size={20}
                        className="absolute bottom-0 left-0 m-2 backdrop-blur-md rounded-tl-lg text-white"
                     />
                  </Tooltip>
               )}
            </div>
         </Layout>

         <Flex vertical gap="small" className="p-4 w-full h-fit flex-1">
            <Flex gap="middle" justify="space-between">
               <Text strong className="text-lg line-clamp-1 truncate">
                  {vendorInfo.brand_name}
               </Text>
            </Flex>
            <Flex gap="middle" justify="space-between">
               <Text type="secondary" className="flex gap-2 items-center">
                  <IoLocation size={20} />
                  {vendorInfo.location}
               </Text>
            </Flex>

            <Flex gap="small" justify="center">
               <Button
                  type="default"
                  href={`/vendors/${vendorInfo.vendorid}`}
                  icon={<GrServices />}
               >
                  View Services
               </Button>
            </Flex>
         </Flex>
      </Card>
   )
}

export default VendorCard
