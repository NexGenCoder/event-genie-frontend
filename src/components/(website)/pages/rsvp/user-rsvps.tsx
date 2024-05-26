'use client'
import { Button, Card, Layout, Typography } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

import { useUpdateDirectRsvpMutation } from '@/app/services/rsvpApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { IGetUserRsvp } from '@/types/rsvp'

const { Text, Title } = Typography

interface UserRsvpsProps {
   rsvps: IGetUserRsvp['data']
}

function UserRsvps({ rsvps }: UserRsvpsProps) {
   const { isLoggedin, isLoading } = useIsAuthenticated()

   if (isLoading) return null
   if (!isLoggedin) return null

   const handleAccept = (rsvpid: string) => {
      // Handle accept logic here
   }

   const handleReject = (rsvpid: string) => {
      // Handle reject logic here
   }

   return (
      <Layout className="w-full flex flex-col gap-4 items-center md:w-[80%] ">
         <Title level={3} className="text-center">
            Your invitations
         </Title>
         <Text className="text-center">
            Accept or reject the invitations you have received
         </Text>
         <div className="w-full flex gap-4 flex-wrap justify-center">
            {rsvps.map((rsvp) => (
               <Card
                  key={rsvp.rsvpid}
                  cover={
                     <Image
                        width={200}
                        height={200}
                        alt={rsvp.event.event_name}
                        src={rsvp.event.event_logo}
                        className="w-[150px] h-[150px] p-8 object-cover rounded-xl"
                     />
                  }
                  className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
               >
                  <Card.Meta
                     className="flex flex-col justify-center gap-2 p-2"
                     title={
                        <div className="text-center truncate">
                           <Text strong>{rsvp.event.event_name}</Text>
                        </div>
                     }
                     description={
                        <div className="text-center">
                           <Text>Status: {rsvp.status}</Text>
                           <br />
                           <Text>
                              Expiry:{' '}
                              {moment().endOf('day').from(rsvp.expiry_at)}
                           </Text>
                        </div>
                     }
                  />
                  <div className="flex justify-center gap-2 p-2">
                     {
                        // if status is accepted or rejected, don't show the buttons
                        rsvp.status === 'accepted' ||
                        rsvp.status == 'declined' ? (
                           <Text>{rsvp.status}</Text>
                        ) : (
                           <>
                              <Button
                                 type="primary"
                                 onClick={() => handleAccept(rsvp.rsvpid)}
                              >
                                 Accept
                              </Button>
                              <Button
                                 type="default"
                                 onClick={() => handleReject(rsvp.rsvpid)}
                              >
                                 Reject
                              </Button>
                           </>
                        )
                     }
                  </div>
               </Card>
            ))}
            <Card
               key="new"
               cover={
                  <Image
                     width={200}
                     height={200}
                     alt="join event"
                     src="/svgs/add.svg"
                     className="w-[150px] h-[150px] p-8"
                  />
               }
               className="cursor-pointer hover:shadow-xl transition duration-300 ease-in-out"
            >
               <Card.Meta
                  className="flex flex-col justify-center gap-2 p-2"
                  title={
                     <div className="text-center truncate">
                        <Text strong>Browse events and join</Text>
                     </div>
                  }
                  description={
                     <div className="text-center">
                        <Text>Join public events</Text>
                        <br />
                        <Text>By selecting this option</Text>
                     </div>
                  }
               />
               <div className="flex justify-center gap-2 pb-2">
                  <Button type="primary">Join</Button>
               </div>
            </Card>
         </div>
      </Layout>
   )
}

export default UserRsvps
