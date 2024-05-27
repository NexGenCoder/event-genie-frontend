import {
   Button,
   Card,
   Descriptions,
   Flex,
   Form,
   Image,
   Input,
   InputNumber,
   message,
   Modal,
   Tooltip,
} from 'antd'
import React, { useState } from 'react'
import { GoUnverified } from 'react-icons/go'
import { MdVerified } from 'react-icons/md'

import {
   useSendOtpMutation,
   useUpdateUserDetailsMutation,
   useVerifyOtpMutation,
} from '@/app/services/authApi'
import { CountrySelector } from '@/components/(website)/pages/login/country-selector'
import ImageUpload from '@/components/profile/image-upload'
import { IUser } from '@/types/user'
import { imageUpload } from '@/utils/uploadImage'

import type { GetProp } from 'antd'
import type { OTPProps } from 'antd/es/input/OTP'
interface EditProfileProps {
   user: IUser
}
const EditProfile = ({ user }: EditProfileProps) => {
   const [form] = Form.useForm()
   const [image, setImage] = useState<File | null>(null)

   const [isEditing, setIsEditing] = useState(false)
   const [otpVisible, setOtpVisible] = useState(false)
   const [mobileNumber, setMobileNumber] = useState(user.mobile || '')
   const [otp, setOtp] = useState<string>('')

   const [sendOtp, { isLoading: isSendingOtp, data: sendOtpResponse }] =
      useSendOtpMutation()
   const [verifyOtp, { isLoading: isOtpVerifying, data: verifyOtpResponse }] =
      useVerifyOtpMutation()
   const [updateUserDetails, { isLoading: isUpdatingUserDetails }] =
      useUpdateUserDetailsMutation()

   const handleEdit = () => {
      setIsEditing(true)
      form.setFieldsValue({
         firstname: user.firstname,
         lastname: user.lastname,
         username: user.username,
         bio: user.bio,
         mobile: user.mobile,
         profilePicture: user.profile_picture,
      })
   }

   const handleSave = async () => {
      const imageUrl = image ? await imageUpload(image, 'profile') : null
      try {
         const values = await form.validateFields()
         const response = await updateUserDetails({
            ...values,
            profilePicture: imageUrl || user.profile_picture,
         }).unwrap()

         message
            .loading('Updating profile...', 2)
            .then(() => message.success(response.message))
         setIsEditing(false)
      } catch (error) {
         message.error('Failed to update profile. Please try again.')
      }
   }

   const handleMobileChange = async (value: any) => {
      value = value.toString()
      if (value.length === 10) {
         setMobileNumber(value)
         setOtpVisible(true)
         try {
            const response = await sendOtp({
               mobile: value,
               country_code: '91',
            }).unwrap()
            message
               .loading('Sending OTP...', 2)
               .then(() => message.success(response.message))
         } catch (error: any) {
            message.error(error.data.message)
         }
      } else {
         setMobileNumber(value)
      }
   }

   const handleOtpVerify = async (otp: string) => {
      try {
         await verifyOtp({
            mobile: mobileNumber,
            otp,
            userid: user.userid,
         }).unwrap()
         message.success('Mobile number verified successfully!')
         setOtpVisible(false)
      } catch (error) {
         message.error('Failed to verify OTP. Please try again.')
      }
   }

   const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
      setOtp(text)
   }

   const sharedProps: OTPProps = {
      onChange,
   }

   return (
      <Card
         title="Edit Profile"
         extra={
            isEditing ? (
               <Flex gap="middle">
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button
                     type="primary"
                     onClick={handleSave}
                     loading={isSendingOtp || isOtpVerifying}
                  >
                     Save
                  </Button>
               </Flex>
            ) : (
               <Button type="primary" onClick={handleEdit}>
                  Edit
               </Button>
            )
         }
      >
         <Form form={form} layout="vertical" onFinish={handleSave}>
            <Descriptions bordered column={1}>
               <Descriptions.Item label="Full Name">
                  {isEditing ? (
                     <>
                        <Form.Item
                           name="firstname"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter your first name',
                              },
                           ]}
                        >
                           <Input />
                        </Form.Item>
                        <Form.Item
                           name="lastname"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter your last name',
                              },
                           ]}
                        >
                           <Input />
                        </Form.Item>
                     </>
                  ) : (
                     `${user.firstname} ${user.lastname}`
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Profile Picture">
                  {isEditing ? (
                     <Form.Item name="profilePicture">
                        <ImageUpload
                           setImage={setImage}
                           defaultImage={user.profile_picture}
                        />
                     </Form.Item>
                  ) : (
                     <Image src={user.profile_picture} alt="Profile Picture" />
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="User ID">
                  {user.userid}
               </Descriptions.Item>
               <Descriptions.Item label="Google ID">
                  {user.googleid}
               </Descriptions.Item>
               <Descriptions.Item label="Username">
                  {isEditing ? (
                     <Form.Item
                        name="username"
                        rules={[
                           {
                              required: true,
                              message: 'Please enter a username',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>
                  ) : (
                     user.username || 'N/A'
                  )}
               </Descriptions.Item>

               <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
               <Descriptions.Item label="Mobile">
                  {isEditing ? (
                     <Form.Item
                        name="mobile"
                        initialValue={user.mobile}
                        rules={[
                           {
                              required: true,
                              message: 'Please enter your mobile number',
                           },
                        ]}
                     >
                        <InputNumber
                           addonBefore={<CountrySelector />}
                           onChange={handleMobileChange}
                        />
                     </Form.Item>
                  ) : (
                     user.mobile || 'N/A'
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Bio">
                  {isEditing ? (
                     <Form.Item name="bio">
                        <Input.TextArea />
                     </Form.Item>
                  ) : (
                     user.bio || 'N/A'
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Mobile Verified">
                  {user.is_mobile_verified ? (
                     <Tooltip title="Mobile number verified">
                        <MdVerified color="green" size={20} />
                     </Tooltip>
                  ) : (
                     <Tooltip title="Mobile number not verified">
                        <GoUnverified color="red" size={20} />
                     </Tooltip>
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Email Verified">
                  {user.is_email_verified ? (
                     <Tooltip title="Email verified">
                        <MdVerified color="green" size={20} />
                     </Tooltip>
                  ) : (
                     <GoUnverified color="red" size={20} />
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Profile Completed">
                  {user.is_profile_completed ? (
                     <Tooltip title="Profile completed">
                        <MdVerified color="green" size={20} />
                     </Tooltip>
                  ) : (
                     <Tooltip title="Profile not completed">
                        <GoUnverified color="red" size={20} />
                     </Tooltip>
                  )}
               </Descriptions.Item>
               <Descriptions.Item label="Account Suspended">
                  {user.is_account_suspended ? (
                     <Tooltip title="Account suspended">
                        <MdVerified color="green" size={20} />
                     </Tooltip>
                  ) : (
                     <Tooltip title="Account not suspended">
                        <GoUnverified color="red" size={20} />
                     </Tooltip>
                  )}
               </Descriptions.Item>
            </Descriptions>
         </Form>
         <Modal
            title="Verify Mobile Number"
            open={otpVisible}
            onCancel={() => setOtpVisible(false)}
            footer={null}
            width={400}
         >
            <Form
               onFinish={(values) => handleOtpVerify(values.otp)}
               layout="vertical"
            >
               <Form.Item
                  name="otp"
                  label="Enter OTP"
                  className="w-full"
                  rules={[{ required: true, message: 'Please enter the OTP' }]}
               >
                  <Input.OTP {...sharedProps} />
               </Form.Item>
               <Button type="primary" htmlType="submit">
                  Verify OTP
               </Button>
            </Form>
         </Modal>
      </Card>
   )
}

export default EditProfile
