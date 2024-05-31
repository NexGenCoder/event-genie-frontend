'use client'
import { Button, Layout, Result, Spin, Steps } from 'antd'
import React, { useState } from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const EventCreation: React.FC = () => {
   const [currentStep, setCurrentStep] = useState(0)
   const [eventData, setEventData] = useState<any>({})
   const { isLoggedin, isLoading } = useIsAuthenticated()

   const nextStep = () => {
      setCurrentStep(currentStep + 1)
   }

   const prevStep = () => {
      setCurrentStep(currentStep - 1)
   }

   const handleEventDataChange = (data: any) => {
      setEventData({ ...eventData, ...data })
   }

   const steps = [
      <Step1
         key="step1"
         nextStep={nextStep}
         handleEventDataChange={handleEventDataChange}
      />,
      <Step2
         key="step2"
         prevStep={prevStep}
         nextStep={nextStep}
         handleEventDataChange={handleEventDataChange}
         eventType={eventData.eventType}
         defaultEventImage={eventData.eventLogo}
      />,
      <Step3 key="step3" />,
   ]

   const contentStyle: React.CSSProperties = {
      padding: 50,
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
   }

   const content = <div style={contentStyle} />

   if (isLoading)
      return (
         <Layout className="flex items-center justify-center w-full">
            <Spin size="large" tip="Loading..." className="w-full h-full">
               {content}
            </Spin>
         </Layout>
      )

   if (!isLoggedin) {
      return (
         <Layout className="flex items-center justify-center w-full">
            <Result
               status="403"
               title="You are not logged in"
               subTitle="Please log in to view your events"
               extra={
                  <Button type="primary" href="/login" key="console">
                     Log in
                  </Button>
               }
            />
         </Layout>
      )
   }
   return (
      <Layout className="w-full flex flex-col items-center justify-center md:w-[80%] ">
         <Steps current={currentStep} size="small" className="pb-2 ">
            <Steps.Step title="Select Event Type" />
            <Steps.Step title="Event Details" />
            <Steps.Step title="Event Created" />
         </Steps>
         {steps[currentStep]}
      </Layout>
   )
}

export default EventCreation
