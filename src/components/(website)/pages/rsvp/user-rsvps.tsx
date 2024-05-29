'use client'
import { Button, Card, Layout, message, Modal, Typography } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

import {
   useUpdateDirectRsvpMutation,
   useUpdateOpenRsvpMutation,
} from '@/app/services/rsvpApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import { IGetUserRsvp, IUpdateRsvp } from '@/types/rsvp'

const { Text, Title } = Typography

interface UserRsvpsProps {
   rsvps: IGetUserRsvp['data']
}

function UserRsvps({ rsvps }: UserRsvpsProps) {
   const { isLoggedin, isLoading } = useIsAuthenticated()
   const [modal, modalContextHolder] = Modal.useModal()

   const confirm = () => {
      modal.confirm({
         title: 'Do you want to accept this invitation?',
         content: 'Click accept to confirm',
         onOk() {
            handleAccept(rsvps[0].rsvpid)
         },
         onCancel() {
            console.log('Cancel')
         },
      })
   }

   const cancel = () => {
      modal.confirm({
         title: 'Do you want to reject this invitation?',
         content: 'Click reject to confirm',
         onOk() {
            handleReject(rsvps[0].rsvpid)
         },
         onCancel() {
            console.log('Cancel')
         },
      })
   }

   const [updateDirectRsvp, { isLoading: isDirectRsvpUpdating }] =
      useUpdateDirectRsvpMutation()
   const [updateOpenRsvp, { isLoading: usOPenRsvpUpdating }] =
      useUpdateOpenRsvpMutation()
   const [messageApi, contextHolder] = message.useMessage()

   if (isLoading) return null
   if (!isLoggedin) return null

   const handleAccept = async (rsvpid: string) => {
      try {
         const requestBody: IUpdateRsvp = {
            rsvpid,
            status: 'accepted',
         }

         const response = await updateDirectRsvp(requestBody)

         messageApi
            .open({
               type: 'loading',
               content: 'Updating RSVP...',
               duration: 1,
            })
            .then(() => {
               messageApi.success(response.data.message)
            })
      } catch (error: any) {
         messageApi.error(error.data.message)
      }
   }

   const handleReject = async (rsvpid: string) => {
      try {
         const requestBody: IUpdateRsvp = {
            rsvpid,
            status: 'declined',
         }

         const response = await updateDirectRsvp(requestBody)

         messageApi
            .open({
               type: 'loading',
               content: 'Updating RSVP...',
               duration: 1,
            })
            .then(() => {
               messageApi.success(response.data.message)
            })
      } catch (error: any) {
         messageApi.error(error.data.message)
      }
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
                     {rsvp.status === 'accepted' ||
                     rsvp.status == 'declined' ? (
                        <Text className="capitalize">{rsvp.status}</Text>
                     ) : (
                        <>
                           <Button type="primary" onClick={confirm}>
                              Accept
                           </Button>
                           <Button type="default" onClick={cancel}>
                              Reject
                           </Button>
                        </>
                     )}
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
         {contextHolder}
         {modalContextHolder}
      </Layout>
   )
}

export default UserRsvps
