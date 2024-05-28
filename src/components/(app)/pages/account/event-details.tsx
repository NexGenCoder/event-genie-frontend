import {
   Alert,
   Button,
   Card,
   Descriptions,
   Form,
   Image,
   message,
   Spin,
} from 'antd'
import React, { useState } from 'react'

import {
   useGetEventDetailsQuery,
   useGetEventTypesQuery,
   useUpdateEventMutation,
} from '@/app/services/eventsApi'
import { IUpdateEvent } from '@/types/event'

import EditEventForm from './update-event'

interface EventDetailsProps {
   eventid: string
}

const EventDetails = ({ eventid }: EventDetailsProps) => {
   const { data: event, isLoading, error } = useGetEventDetailsQuery(eventid)
   const [isEditing, setIsEditing] = useState(false)
   const [form] = Form.useForm()
   const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
   const [messageApi, contextHolder] = message.useMessage()
   const { data: eventTypes, isLoading: isEventTypesLoading } =
      useGetEventTypesQuery()

   const handleEditClick = () => {
      setIsEditing(true)
   }

   const handleCancelClick = () => {
      setIsEditing(false)
   }

   if (isLoading) {
      return <Spin tip="Loading event details..." />
   }

   if (error) {
      return (
         <Alert
            message="Error"
            description="Failed to load event details"
            type="error"
            showIcon
         />
      )
   }

   if (!event) {
      return (
         <Alert
            message="Not Found"
            description="Event not found"
            type="warning"
            showIcon
         />
      )
   }

   return (
      <Card
         title="Event Details"
         style={{ width: '100%' }}
         extra={
            event.data.role === 'host' && (
               <>
                  {isEditing ? (
                     <Button onClick={handleCancelClick}>Cancel</Button>
                  ) : (
                     <Button onClick={handleEditClick}>Edit</Button>
                  )}
               </>
            )
         }
      >
         {isEditing ? (
            <>
               {eventTypes && (
                  <EditEventForm
                     eventId={eventid}
                     handleCancel={handleCancelClick}
                     eventTypes={eventTypes.data}
                  />
               )}
            </>
         ) : (
            <Descriptions bordered column={1}>
               <Descriptions.Item label="Event Name">
                  {event.data.event_name}
               </Descriptions.Item>
               <Descriptions.Item label="Event Type">
                  {event.data.event_type}
               </Descriptions.Item>
               <Descriptions.Item label="Event Logo">
                  <Image
                     src={event.data.event_logo}
                     alt="Event Logo"
                     className="rounded-lg"
                     style={{ objectFit: 'cover', width: '200px' }}
                  />
               </Descriptions.Item>
               <Descriptions.Item label="Start Date Time">
                  {new Date(event.data.start_date_time).toLocaleString()}
               </Descriptions.Item>
               <Descriptions.Item label="End Date Time">
                  {new Date(event.data.end_date_time).toLocaleString()}
               </Descriptions.Item>
               <Descriptions.Item label="Description">
                  {event.data.description}
               </Descriptions.Item>
               <Descriptions.Item label="Location">
                  {event.data.location}
               </Descriptions.Item>
               <Descriptions.Item label="Private Event">
                  {event.data.is_private ? 'Yes' : 'No'}
               </Descriptions.Item>
               <Descriptions.Item label="Created At">
                  {new Date(event.data.created_at).toLocaleString()}
               </Descriptions.Item>
               <Descriptions.Item label="Updated At">
                  {new Date(event.data.updated_at).toLocaleString()}
               </Descriptions.Item>
            </Descriptions>
         )}
      </Card>
   )
}

export default EventDetails
