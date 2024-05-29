import {
   Button,
   DatePicker,
   Flex,
   Form,
   Input,
   message,
   Select,
   Switch,
} from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import {
   useGetEventDetailsQuery,
   useUpdateEventMutation,
} from '@/app/services/eventsApi'
import ImageUpload from '@/components/profile/image-upload'
import { IEventType, IUpdateEvent } from '@/types/event'
import { imageUpload } from '@/utils/uploadImage'

interface EditEventFormProps {
   eventId: string
   handleCancel: () => void
   eventTypes: IEventType[]
}

const EditEventForm = ({
   eventId,
   handleCancel,
   eventTypes,
}: EditEventFormProps) => {
   const [image, setImage] = useState<File | null>(null)
   const [form] = Form.useForm()

   const { data: event, isLoading: isEventLoading } =
      useGetEventDetailsQuery(eventId)
   const [updateEvent, { isLoading: isEventUpdating }] =
      useUpdateEventMutation()
   const [messageApi, contextHolder] = message.useMessage()

   const onFinish = async (values: any) => {
      const imageUrl = await imageUpload(image as File, `event-${eventId}-logo`)

      const eventData: IUpdateEvent = {
         eventid: eventId,
         event_name: values.eventName,
         start_date_time: values.startDateTime.format(),
         end_date_time: values.endDateTime.format(),
         description: values.description,
         event_logo: imageUrl || event?.data.event_logo,
         location: values.location,
         event_type: values.eventType,
         is_private: values.isPrivate,
      }
      try {
         const response = await updateEvent(eventData).unwrap()
         messageApi.success(`Event Updated Successfully!`)
         handleCancel()
      } catch (error) {
         messageApi.error(`Failed to update event!`)
         console.error(error)
      }
   }

   return (
      <Form
         form={form}
         layout="vertical"
         onFinish={onFinish}
         className="w-full p-4"
         initialValues={{
            eventName: event?.data.event_name,
            eventType: event?.data.event_type,
            startDateTime: moment(event?.data.start_date_time),
            endDateTime: moment(event?.data.end_date_time),
            description: event?.data.description,
            location: event?.data.location,
            isPrivate: event?.data.is_private,
         }}
      >
         <Form.Item
            name="eventLogo"
            label="Event Logo"
            className="w-full top-0 left-0 flex justify-center items-center"
         >
            <ImageUpload
               setImage={setImage}
               defaultImage={event?.data.event_logo}
            />
         </Form.Item>
         <Form.Item
            name="eventType"
            label="Event Type"
            rules={[
               { required: true, message: 'Please select the event type!' },
            ]}
         >
            <Select>
               {eventTypes.map((type) => (
                  <Select.Option value={type.name} key={type.id}>
                     <Flex className="items-center" gap="middle">
                        <Image
                           width={24}
                           height={24}
                           src={type.image_url}
                           alt={type.name}
                        />
                        {type.name}
                     </Flex>
                  </Select.Option>
               ))}
            </Select>
         </Form.Item>
         <Form.Item
            name="eventName"
            label="Event Name"
            className="w-full"
            rules={[
               { required: true, message: 'Please input the event name!' },
            ]}
         >
            <Input />
         </Form.Item>
         <Form.Item
            name="isPrivate"
            label="Private Event"
            valuePropName="checked"
            className="w-full"
         >
            <Switch defaultChecked={event?.data.is_private} />
         </Form.Item>
         <Form.Item
            name="startDateTime"
            label="Start Date Time"
            className="w-full"
            rules={[
               {
                  required: true,
                  message: 'Please select the start date and time!',
               },
            ]}
         >
            <DatePicker className="w-full" />
         </Form.Item>
         <Form.Item
            name="endDateTime"
            label="End Date Time"
            className="w-full"
            rules={[
               {
                  required: true,
                  message: 'Please select the end date and time!',
               },
            ]}
         >
            <DatePicker className="w-full" />
         </Form.Item>
         <Form.Item name="description" label="Description (Optional)">
            <Input.TextArea />
         </Form.Item>
         <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input the location!' }]}
         >
            <Input />
         </Form.Item>
         <div className="flex justify-between">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isEventUpdating}>
               Update Event
            </Button>
         </div>
         {contextHolder}
      </Form>
   )
}

export default EditEventForm
