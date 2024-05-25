import React, { useState } from 'react'
import { Button, DatePicker, Flex, Form, Input, Upload } from 'antd'
import ImageUpload from '../profile/image-upload'
import { imageUpload } from '@/utils/uploadImage'
import { ICreateEventBody } from '@/types/event'
import {
   useCreateEventMutation,
   useGetUserEventsQuery,
} from '@/app/services/eventsApi'
import toast, { Toaster } from 'react-hot-toast'

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
         toast.success(response.message, { position: 'top-right' })
         queryClient.refetch()
         nextStep()
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
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
         <Form.Item
            name="eventName"
            label="Event Name"
            rules={[
               { required: true, message: 'Please input the event name!' },
            ]}
         >
            <Input />
         </Form.Item>
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
               <DatePicker className="w-full" showTime />
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
               <DatePicker className="w-full" showTime />
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
         <Toaster />
      </Form>
   )
}

export default Step2
