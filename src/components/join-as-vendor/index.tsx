'use client'
import React, { useState } from 'react'
import { Form, Button, Input, message, InputNumber, Flex, Layout } from 'antd'
import { IVendorCreateBody } from '@/types/vendor'
import { useCreateVendorMutation } from '@/app/services/vendorsApi'
import ImageUpload from '../profile/image-upload'
import { imageUpload } from '@/utils/uploadImage'

const VendorOnboarding = () => {
   const [brandImage, setBrandImage] = useState<File | null>(null)
   const [form] = Form.useForm()
   const [messageApi, contextHolder] = message.useMessage()
   const [createVendor] = useCreateVendorMutation()
   const [numberError, setNumberError] = useState(false)

   const handleSubmit = async (values: IVendorCreateBody) => {
      const brandUrl = brandImage
         ? await imageUpload(brandImage, 'vendor')
         : null
      const requestBody = {
         brandName: values.brandName,
         brandLogo: brandUrl,
         location: values.location,
         description: values.description,
         email: values.email,
         phone: values.phone,
      }
      try {
         const result = await createVendor(requestBody).unwrap()
         if (result.message != 'Vendor created successfully') {
            throw Error(result.message)
         }
         messageApi
            .open({
               type: 'loading',
               content: 'Onboarding Vendor...',
               duration: 2.5,
            })
            .then(() => {
               messageApi.success('Vendor Onboarded Successfully!')
               form.resetFields()
            })
      } catch (error: any) {
         console.log(error)
         messageApi.error(`Error onboarding the vendor: ${error.data.message}`)
      }
   }

   return (
      <>
         <Layout className="w-full flex flex-col items-center justify-center md:w-[80%] ">
            <Form
               form={form}
               onFinish={handleSubmit}
               layout="vertical"
               className="w-full "
            >
               <Form.Item
                  name="brandLogo"
                  label="Brand Logo"
                  className="w-full top-0 left-0 flex justify-center items-center"
               >
                  <ImageUpload setImage={setBrandImage} />
               </Form.Item>
               <Form.Item
                  name="brandName"
                  label="Brand Name"
                  rules={[
                     {
                        required: true,
                        message: 'Please input the Brand Name!',
                     },
                  ]}
               >
                  <Input />
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
                  name="email"
                  label="Email"
                  rules={[
                     { required: true, message: 'Please input the Email!' },
                     { type: 'email', message: 'Input must be valid Email' },
                  ]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                     {
                        required: true,
                        message: 'Please Input the Phone Number',
                     },
                  ]}
               >
                  <Input className="w-full" minLength={10} maxLength={10} />
               </Form.Item>
               <Form.Item>
                  <Flex justify="end">
                     <Button type="primary" htmlType="submit">
                        Submit
                     </Button>
                  </Flex>
               </Form.Item>
            </Form>
         </Layout>
         {contextHolder}
      </>
   )
}

export default VendorOnboarding
