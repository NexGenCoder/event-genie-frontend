import { Button, Card, DatePicker, Form, Input, message, Switch } from 'antd'
import React, { useState } from 'react'

import { useCreateChildEventMutation } from '@/app/services/eventsApi'
import { ICreateChildEventBody } from '@/types/event'

import PageDetails from './page-details'

interface CreateSubEventProps {
   parentId: string
   onBack: () => void
}

const CreateSubEvent = ({ parentId, onBack }: CreateSubEventProps) => {
   const [form] = Form.useForm()
   const [createChildEvent, { isLoading }] = useCreateChildEventMutation()
   const [messageApi, contextHolder] = message.useMessage()

   const onFinish = async (values: any) => {
      const subEventData: ICreateChildEventBody = {
         parentId,
         eventName: values.eventName,
         startDateTime: values.startDateTime.toISOString(),
         endDateTime: values.endDateTime.toISOString(),
         description: values.description,
         location: values.location,
         eventType: values.eventType,
         isPrivate: values.isPrivate,
      }
      try {
         await createChildEvent(subEventData).unwrap()
         messageApi.success('Sub-event created successfully!')
         form.resetFields()
      } catch (error) {
         messageApi.error('Failed to create sub-event')
         console.error(error)
      }
   }

   return (
      <Card>
         <PageDetails title="Add Sub-Event" onBack={onBack}></PageDetails>
         <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="w-full p-4"
         >
            <Form.Item
               name="eventName"
               label="Sub-Event Name"
               rules={[
                  {
                     required: true,
                     message: 'Please input the sub-event name!',
                  },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="startDateTime"
               label="Start Date Time"
               rules={[
                  {
                     required: true,
                     message: 'Please select the start date and time!',
                  },
               ]}
            >
               <DatePicker showTime className="w-full" />
            </Form.Item>
            <Form.Item
               name="endDateTime"
               label="End Date Time"
               rules={[
                  {
                     required: true,
                     message: 'Please select the end date and time!',
                  },
               ]}
            >
               <DatePicker showTime className="w-full" />
            </Form.Item>
            <Form.Item name="description" label="Description (Optional)">
               <Input.TextArea />
            </Form.Item>
            <Form.Item
               name="location"
               label="Location"
               rules={[
                  { required: true, message: 'Please input the location!' },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="eventType"
               label="Event Type"
               rules={[
                  { required: true, message: 'Please input the event type!' },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="isPrivate"
               label="Private Event"
               valuePropName="checked"
            >
               <Switch />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Create Sub-Event
            </Button>
            {contextHolder}
         </Form>
      </Card>
   )
}

export default CreateSubEvent
