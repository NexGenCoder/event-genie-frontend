import React, { useState } from 'react'
import { Button, DatePicker, Flex, Form, Input, Upload } from 'antd'
import ImageUpload from '../profile/image-upload'
import { imageUpload } from '@/utils/uploadImage'

interface Step2Props {
   prevStep: () => void
   nextStep: () => void
   handleEventDataChange: (data: any) => void
   eventType: string
}

const Step2 = ({
   prevStep,
   nextStep,
   handleEventDataChange,
   eventType,
}: Step2Props) => {
   const [image, setImage] = useState<File | null>(null)
   const [form] = Form.useForm()
   const userData = {
      profile_picture:
         'https://lh3.googleusercontent.com/a/ACg8ocJ2138fIy0v6TcbDsGZOZm5_NPylKzQLNupK8RpHWC_66N4uYN3=s96-c',
   }

   const onFinish = async (values: any) => {
      // const imageUrl = image ? await imageUpload(image, 'profile') : null
      const eventData = {
         ...values,
         eventType,
         // eventLogo: imageUrl,
      }
      handleEventDataChange(eventData)
      console.log(eventData)
      nextStep()
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
            <ImageUpload
               setImage={setImage}
               defaultImage={userData?.profile_picture}
            />
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
            <Button type="primary" htmlType="submit">
               Submit
            </Button>
         </div>
      </Form>
   )
}

export default Step2
