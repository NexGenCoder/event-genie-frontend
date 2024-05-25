import { Layout } from 'antd'
import React from 'react'

import LoginForm from './login-form'

function LoginPage() {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6 w-full">
         <Layout className="md:w-[50%] w-full border-2 rounded-[20px]">
            <LoginForm />
         </Layout>
      </Layout>
   )
}

export default LoginPage
