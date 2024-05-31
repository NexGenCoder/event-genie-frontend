'use client'
import { Button, Form, Input, Layout, message } from 'antd'
import React from 'react'

import { useUpdateOpenRsvpMutation } from '@/app/services/rsvpApi'
import { IUpdateRsvp } from '@/types/rsvp'
import { extractUuidFromUrl } from '@/utils/extractUuidFromUrl'

const JoinEvent = () => {
   const [messageApi, contextHolder] = message.useMessage()
   const [form] = Form.useForm()

   const [acceptRsvp] = useUpdateOpenRsvpMutation()

   const handleSubmit = async (values: { rsvpid: string }) => {
      const requestBody: IUpdateRsvp = {
         rsvpid: values.rsvpid,
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
      form.setFieldsValue({ rsvpid: uuid })
   }

   return (
      <Layout className="w-full flex flex-col items-center justify-center md:w-[80%]">
         <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="w-full"
         >
            <Form.Item
               name="rsvpid"
               label="Enter invite URL"
               className="w-full top-0 left-0 flex justify-center items-center"
            >
               <Input
                  className="w-full"
                  placeholder="Enter invite URL"
                  onChange={handleUrlChange}
               />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit" className="w-full">
                  Accept RSVP
               </Button>
            </Form.Item>
         </Form>

         {contextHolder}
      </Layout>
   )
}

export default JoinEvent
