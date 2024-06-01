'use client'
import { Button, Input, message, Modal, Typography } from 'antd'
import React from 'react'

import { useUpdateOpenRsvpMutation } from '@/app/services/rsvpApi'
import { IUpdateRsvp } from '@/types/rsvp'
import { extractUuidFromUrl } from '@/utils/extractUuidFromUrl'

const { Title, Text } = Typography

interface IJoinEventModalProps {
   open: boolean
   setOpen: (open: boolean) => void
}

const JoinEventModal = ({ open, setOpen }: IJoinEventModalProps) => {
   const [messageApi, contextHolder] = message.useMessage()
   const [uuid, setUuid] = React.useState<string>('')

   const [acceptRsvp] = useUpdateOpenRsvpMutation()

   const handleSubmit = async () => {
      const requestBody: IUpdateRsvp = {
         rsvpid: uuid,
      }

      try {
         const result = await acceptRsvp(requestBody).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Accepting RSVP...',
               duration: 2.5,
            })
            .then(() => {
               messageApi.success(result.message)
            })
      } catch (error: any) {
         messageApi.error(`Error accepting the RSVP: ${error.data.message}`)
      }
   }

   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value
      const uuid = extractUuidFromUrl(url)
      if (uuid) {
         setUuid(uuid)
      }
   }

   return (
      <Modal
         title="Join Event"
         open={open}
         footer={null}
         onCancel={() => setOpen(false)}
         className="w-full"
      >
         <Title level={2}>Join Event</Title>
         <Text>Enter the event URL to join the event.</Text>
         <Input
            placeholder="Enter the event URL"
            onChange={handleUrlChange}
            className="w-full mt-4"
         />
         <Button type="primary" onClick={handleSubmit} className="w-full mt-4">
            Join Event
         </Button>

         {contextHolder}
      </Modal>
   )
}

export default JoinEventModal
