import { Button, Flex, Image, Space, theme, Typography } from 'antd'
import React from 'react'
import { IoArrowBack, IoSearch } from 'react-icons/io5'

import { IUser } from '@/types/user'

const { Text } = Typography

interface DirectMessageUserDetailsProps {
   userDetails: IUser
   onBack?: () => void
   onSearch?: () => void
}

const DirectMessageUserDetails = ({
   userDetails,
   onBack,
   onSearch,
}: DirectMessageUserDetailsProps) => {
   console.log('🚀 ~ userDetails:', userDetails)
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <Flex className="top-0 left-0 w-full p-2 shadow-md" vertical>
         <Flex
            gap="small"
            justify="space-between"
            align="center"
            style={{ width: '100%' }}
         >
            <Flex gap="small" align="center">
               <Space className="md:hidden flex">
                  <Button
                     type="text"
                     className="text-2xl"
                     icon={<IoArrowBack />}
                     title="Back"
                     onClick={onBack}
                  />
               </Space>

               <Flex gap="small" align="center" className="w-full">
                  <Image
                     src={userDetails.profile_picture}
                     preview={false}
                     width={40}
                     alt={userDetails.firstname}
                     height={40}
                     className="rounded-full"
                  />

                  <Text strong className="capitalize">
                     {userDetails.firstname} {userDetails.lastname}
                  </Text>
               </Flex>
            </Flex>
            <Button
               type="text"
               className="text-2xl"
               icon={<IoSearch />}
               title="Search"
               onClick={onSearch}
            />
         </Flex>
      </Flex>
   )
}

export default DirectMessageUserDetails
