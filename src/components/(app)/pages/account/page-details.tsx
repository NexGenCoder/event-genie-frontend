import { Button, Flex, Layout, Space, Typography } from 'antd'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const { Text } = Typography

interface PageDetailsProps {
   title: string
   onBack?: () => void
   children?: React.ReactNode
}

const PageDetails = ({ title, onBack, children }: PageDetailsProps) => {
   return (
      <Layout className="w-full flex flex-row gap-2 justify-between px-4 py-2">
         <Flex gap="small" align="center">
            <Space className="md:hidden flex">
               <Button
                  type="text"
                  className="text-2xl"
                  onClick={onBack}
                  icon={<IoArrowBack />}
               />
            </Space>
            <Text>{title}</Text>
         </Flex>
         {children}
      </Layout>
   )
}

export default PageDetails
