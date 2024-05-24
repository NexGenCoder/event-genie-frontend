'use client'
import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import { Layout } from 'antd'

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
         handleEventDataChange={handleEventDataChange}
         eventType={eventData.eventType}
      />,
   ]

   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-6">
         {steps[currentStep]}
      </Layout>
   )
}

export default EventCreation
