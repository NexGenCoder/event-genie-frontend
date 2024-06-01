import { Flex, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoLogIn } from 'react-icons/io5'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import ProfileDropdown from './profile-dropdown'
import NavUserProfile from './user-profile'
import NavUserProfileShimmer from './user-profile-shimmer'

function Navbar() {
   const { isLoggedin, data, isLoading } = useIsAuthenticated()

   const {
      token: { colorBgContainer, colorTextBase },
   } = theme.useToken()
   return (
      <Header
         className="w-full sticky top-0 z-50 px-8 py-2 flex justify-between shadow"
         style={{ backgroundColor: colorBgContainer }}
      >
         <Flex gap="middle">
            <Link
               href="/"
               className="flex items-center text-md gap-2"
               style={{ color: colorTextBase }}
            >
               <Image
                  src="/logo.png"
                  width={35}
                  height={35}
                  alt="Event Genie Logo"
                  className="rounded-full"
               />
               Event Genie
            </Link>
            <nav className="md:flex items-center text-sm hidden ">
               <Link
                  href="/"
                  title="Home"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Home
               </Link>
               <Link
                  href="/vendors"
                  title="Explore Vendors and their services"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Vendors
               </Link>
               <Link
                  href="/events"
                  title="Your Events"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Events
               </Link>
               <Link
                  href="/rsvp"
                  title="Your invitations"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Rsvp
               </Link>
            </nav>
         </Flex>
         <div className="flex gap-2 text-sm items-center">
            {isLoading ? (
               <NavUserProfileShimmer />
            ) : (
               <>
                  {isLoggedin ? (
                     <>
                        {data && (
                           <ProfileDropdown>
                              <NavUserProfile
                                 profile_picture={data.profile_picture}
                                 firstname={data.firstname}
                              />
                           </ProfileDropdown>
                        )}
                     </>
                  ) : (
                     <>
                        <Link
                           href="/login"
                           title="Login"
                           className="flex justify-center items-center border rounded gap-2 py-2 px-5 hover:bg-gray-200 hover:white"
                        >
                           <IoLogIn />
                           Login
                        </Link>
                     </>
                  )}
               </>
            )}
         </div>
      </Header>
   )
}

export default Navbar
