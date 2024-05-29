import { Button, DatePicker, Flex, Form, Input, message, Switch } from 'antd'
import React, { useState } from 'react'

import {
   useCreateEventMutation,
   useGetUserEventsQuery,
} from '@/app/services/eventsApi'
import ImageUpload from '@/components/profile/image-upload'
import { ICreateEventBody } from '@/types/event'
import { imageUpload } from '@/utils/uploadImage'

interface Step2Props {
   prevStep: () => void
   nextStep: () => void
   handleEventDataChange: (data: any) => void
   eventType: string
   defaultEventImage: string
}

const Step2 = ({
   prevStep,
   nextStep,
   handleEventDataChange,
   eventType,
   defaultEventImage,
}: Step2Props) => {
   const [image, setImage] = useState<File | null>(null)
   const [form] = Form.useForm()

   const [createEvent, { isLoading: isEventCreating, data: evenetCRe }] =
      useCreateEventMutation()
   const queryClient = useGetUserEventsQuery()
   const [messageApi, contextHolder] = message.useMessage()

   const onFinish = async (values: any) => {
      const imageUrl = image ? await imageUpload(image, 'profile') : null
      const eventData: ICreateEventBody = {
         ...values,
         eventType,
         eventLogo: imageUrl || defaultEventImage,
      }
      handleEventDataChange(eventData)
      try {
         const response = await createEvent(eventData).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Creating Event...',
               duration: 2.5,
            })
            .then(() => {
               messageApi.success(`Event Created Successfully!`)
               queryClient.refetch()
               nextStep()
            })
      } catch (error) {
         messageApi.error(`Failed to create event!`)
         console.error(error)
      }
   }

   return (
      <Form
         form={form}
         layout="vertical"
         onFinish={onFinish}
         className="w-full "
      >
         <Form.Item
            name="eventLogo"
            label="Event Logo"
            className="w-full top-0 left-0 flex justify-center items-center"
         >
            <ImageUpload setImage={setImage} defaultImage={defaultEventImage} />
         </Form.Item>
         <Flex gap="middle" className="w-full">
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
               className="w-full"
            >
               <Switch defaultChecked={false} />
            </Form.Item>
         </Flex>
         <Flex gap="middle" className="w-full">
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
               <DatePicker
                  className="w-full"
                  minDate={form.getFieldValue('startDateTime')}
               />
            </Form.Item>
         </Flex>
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
            <Button onClick={prevStep}>Previous</Button>
            <Button type="primary" htmlType="submit" loading={isEventCreating}>
               Submit
            </Button>
         </div>
         {contextHolder}
      </Form>
   )
}

export default Step2
