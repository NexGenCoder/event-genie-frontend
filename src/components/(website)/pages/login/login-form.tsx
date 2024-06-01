'use client'
import {
   Button,
   Flex,
   Input,
   InputNumber,
   Layout,
   message,
   Select,
   theme,
   Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FcGoogle } from 'react-icons/fc'
import { IoMdLogIn } from 'react-icons/io'
import { MdOutlineSendToMobile } from 'react-icons/md'

import {
   useDemoUserLoginMutation,
   useGetDemoUserQuery,
   useSendOtpMutation,
   useVerifyOtpMutation,
} from '@/app/services/authApi'
import { API } from '@/constants'
import { IUserResponse } from '@/types/user'

import { CountrySelector } from './country-selector'

const { Link, Text, Title } = Typography
import type { GetProp } from 'antd'
import type { OTPProps } from 'antd/es/input/OTP'

function LoginForm() {
   const router = useRouter()
   const [formData, setFormData] = useState({ mobile: '' })
   const [otp, setOtp] = useState<string>('')
   const [showOtp, setShowOtp] = useState(false)
   const [messageApi, contextHolder] = message.useMessage()
   const { data: userList } = useGetDemoUserQuery()
   const [demoUserLogin, { isLoading }] = useDemoUserLoginMutation()

   const {
      token: { colorTextBase },
   } = theme.useToken()

   const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()

   const [verifyOtp, { isLoading: isOtpVerifying }] = useVerifyOtpMutation()

   const mobileInputOnChange = (value: any) => {
      if (typeof value !== 'string') {
         value = String(value)
      }
      if (value && value.startsWith('0')) {
         value = value.slice(1)
      }
      if (value && (value.startsWith('91') || value.startsWith('91'))) {
         value = value.slice(3)
      }

      if (value && value.length === 10) {
         const mobile = value
         setFormData({ mobile })
      }
   }

   const handleSendOtp = async () => {
      const requestBody = {
         mobile: formData.mobile,
         country_code: '91',
      }
      try {
         const response = await sendOtp(requestBody).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Sending OTP...',
               duration: isSendingOtp ? 0 : 2,
            })
            .then(() => {
               message.success(response.message, 2)
               setShowOtp(true)
            })
      } catch (error: any) {
         message.error(error.data.message, 2)
      }
   }

   const handleVerifyOtp = async () => {
      const requestBody = {
         mobile: formData.mobile,
         otp: otp,
      }

      try {
         const response: IUserResponse = await verifyOtp(requestBody).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Verifying OTP...',
               duration: isOtpVerifying ? 0 : 2,
            })
            .then(() => {
               message.success(response.message, 2)
               if (response?.data.is_profile_completed) {
                  router.push('/')
               } else {
                  router.push('/create-profile')
               }
            })
      } catch (error: any) {
         message.error(error.data.message, 2)
      }
   }

   const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
      setOtp(text)
   }

   const sharedProps: OTPProps = {
      onChange,
   }

   const demoUserLoginHandler = async (username: string) => {
      console.log(username)
      try {
         if (!username) return
         const response = await demoUserLogin({ username }).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Logging in...',
               duration: isLoading ? 0 : 2,
            })
            .then(() => {
               message.success(response.message, 2)
               if (response?.data.is_profile_completed) {
                  router.push('/')
               } else {
                  router.push('/create-profile')
               }
            })
      } catch (error: any) {
         message.error(error.data.message, 2)
      }
   }

   return (
      <Layout className="flex flex-col h-full justify-center md:w-1/2 w-full p-6">
         <Title level={2} className="text-center">
            Login
         </Title>
         <div className="flex flex-col gap-2">
            {!showOtp ? (
               <div className="flex flex-col gap-4 w-full">
                  <Text
                     style={{ color: colorTextBase }}
                     className="block text-md font-medium"
                  >
                     Mobile Number
                  </Text>
                  <Flex gap="middle" vertical align="center">
                     <InputNumber
                        addonBefore={<CountrySelector />}
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile Number"
                        required
                        autoComplete="tel"
                        defaultValue={formData.mobile}
                        size="large"
                        status={formData.mobile ? '' : 'error'}
                        className="w-full text-xl"
                        onChange={mobileInputOnChange}
                     />
                     <Button
                        type="default"
                        className="flex justify-center items-center gap-2"
                        icon={<MdOutlineSendToMobile />}
                        loading={isSendingOtp}
                        size="large"
                        onClick={handleSendOtp}
                     >
                        Send OTP
                     </Button>
                  </Flex>
               </div>
            ) : (
               <>
                  <Flex gap="middle" vertical align="center">
                     <Flex gap="middle" justify="center">
                        <Text>OTP sent to</Text>
                        <button
                           type="button"
                           title="Change Mobile Number"
                           onClick={() => setShowOtp(false)}
                           className="flex items-center gap-2"
                        >
                           <span className="italic">+91 {formData.mobile}</span>
                           <CiEdit />
                        </button>
                     </Flex>
                     <Text
                        style={{ color: colorTextBase }}
                        className="block text-sm font-medium  w-full"
                     >
                        Enter OTP
                     </Text>
                     <Input.OTP
                        size="large"
                        formatter={(str) => str.toUpperCase()}
                        {...sharedProps}
                     />

                     <Button
                        className="flex justify-center items-center gap-2 "
                        type="primary"
                        icon={<IoMdLogIn />}
                        loading={isOtpVerifying}
                        size="large"
                        onClick={handleVerifyOtp}
                     >
                        Sign In
                     </Button>
                  </Flex>
               </>
            )}
         </div>

         <div className="flex items-center gap-4 my-8">
            <hr className="flex-1" />
            <Text className="font-semibold">OR</Text>
            <hr className="flex-1" />
         </div>

         {userList && userList.users && (
            <>
               <Text className="md:text-lg text-md font-semibold">
                  Login as a demo user
               </Text>
               <Select
                  className="w-full"
                  placeholder="Select a user"
                  loading={!userList}
                  onChange={demoUserLoginHandler}
               >
                  {userList.users?.map((user) => (
                     <Select.Option key={user.userid} value={user.username}>
                        {user.firstname} {user.lastname}
                     </Select.Option>
                  ))}
               </Select>

               <div className="flex items-center gap-4 my-8">
                  <hr className="flex-1" />
                  <Text className="font-semibold">OR</Text>
                  <hr className="flex-1" />
               </div>
            </>
         )}

         <div className="flex flex-col justify-center items-center gap-4">
            <Text className="md:text-lg text-md font-semibold">
               Continue with your social account
            </Text>
            <Button
               className="flex justify-center item-center border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2 text-black w-fit"
               href={`${API}/auth/google`}
               style={{ color: colorTextBase }}
            >
               <FcGoogle className="inline-block mr-2" /> Sign In With Google
            </Button>
         </div>
         {contextHolder}
      </Layout>
   )
}

export default LoginForm
