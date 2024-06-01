import { Layout } from 'antd'
import Image from 'next/image'
import React from 'react'

function LoginImage() {
   return (
      <Layout className="md:flex flex-col justify-center w-1/2 hidden">
         <Image
            width={400}
            height={400}
            src="/logo.png"
            alt="Login Image"
            className="rounded-l-[20px] object-cover w-full"
         />
      </Layout>
   )
}

export default LoginImage
