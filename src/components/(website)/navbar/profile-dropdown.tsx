import { Dropdown, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { CiSettings } from 'react-icons/ci'
import { FaStoreAlt } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { MdEvent, MdRsvp } from 'react-icons/md'
import { RiLogoutCircleRLine } from 'react-icons/ri'

import { API } from '@/constants'

import type { MenuProps } from 'antd'
const items: MenuProps['items'] = [
   {
      key: '1',
      label: (
         <Link href="/" className=" p-1  flex items-center gap-2 ">
            <IoMdHome className="inline-block" />
            Home
         </Link>
      ),
   },
   {
      key: '2',
      label: (
         <Link href="/events" className=" p-1  flex items-center gap-2 ">
            <MdEvent className="inline-block" />
            Events
         </Link>
      ),
   },
   {
      key: '3',
      label: (
         <Link href="/vendors" className=" p-1  flex items-center gap-2 ">
            <FaStoreAlt className="inline-block" />
            Vendors
         </Link>
      ),
   },
   {
      key: '4',
      label: (
         <Link href="/rsvp" className=" p-1  flex items-center gap-2 ">
            <MdRsvp className="inline-block" />
            RSVP
         </Link>
      ),
   },
   {
      key: '5',
      label: (
         <Link
            href={`${API}/auth/logout`}
            className=" p-1  flex items-center gap-2 "
         >
            <RiLogoutCircleRLine className="inline-block" />
            Logout
         </Link>
      ),
   },
]

interface ProfileDropdownProps {
   children: React.ReactNode
}

const ProfileDropdown = ({ children }: ProfileDropdownProps) => (
   <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>{children}</a>
   </Dropdown>
)

export default ProfileDropdown
