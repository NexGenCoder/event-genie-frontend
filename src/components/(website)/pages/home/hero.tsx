import { Button, Layout, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

const { Title, Paragraph } = Typography

const HeroComponent = () => {
   return (
      <Layout className="w-full flex flex-col gap-4 items-center justify-center  min-h-screen">
         <Layout className="md:w-[85%] w-full flex lg:flex-row flex-col-reverse justify-between items-center gap-10 md:gap-10 p-4">
            <div className="w-full flex flex-col justify-center gap-4">
               <Title className="lg:text-6xl md:text-4xl text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-blue-800">
                  Discover and Create Memorable Events
               </Title>
               <Paragraph className="text-primary text-lg">
                  Event Genie helps you find events youll love and connect with
                  like-minded individuals.
               </Paragraph>
               <Button type="default" size="large">
                  Get Started
               </Button>
            </div>
            <div className="w-full flex justify-center">
               <Image
                  src="/logo.png"
                  alt="Event Genie"
                  width={500}
                  height={300}
               />
            </div>
         </Layout>
      </Layout>
   )
}

export default HeroComponent
