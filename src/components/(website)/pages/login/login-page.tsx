import { Layout } from 'antd'
import React from 'react'

import LoginForm from './login-form'
import LoginImage from './login-image'

function LoginPage() {
   return (
      <Layout className="flex min-h-[80vh] flex-col items-center justify-between p-6 md:px-20 md:py-6 w-full">
         <Layout className="flex md:flex-row flex-col items-center justify-between w-full border rounded-[20px]">
            <LoginImage />
            <LoginForm />
         </Layout>
      </Layout>
   )
}

export default LoginPage
