import { Avatar, Space, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import { RiArrowDownWideLine } from 'react-icons/ri'

import { UserOutlined } from '@ant-design/icons'

const { Text, Link } = Typography

interface NavUserProfileProps {
   profile_picture: string
   firstname: string
}
function NavUserProfile({ profile_picture, firstname }: NavUserProfileProps) {
   return (
      <button className="flex gap-2 text-sm  items-center rounded-xl">
         <Avatar
            icon={<UserOutlined />}
            size="large"
            src={
               <Image
                  src={profile_picture || '/user.png'}
                  alt="Profile Picture"
                  width={40}
                  height={40}
               />
            }
         />

         <Text strong className="text-lg">
            {firstname}
         </Text>

         <RiArrowDownWideLine size={22} />
      </button>
   )
}

export default NavUserProfile
