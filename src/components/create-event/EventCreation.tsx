'use client'
import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { Layout } from 'antd'
import { Steps } from 'antd'

const EventCreation: React.FC = () => {
   const [currentStep, setCurrentStep] = useState(0)
   const [eventData, setEventData] = useState<any>({})

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
      />,
      <Step3 key="step3" />,
   ]

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
