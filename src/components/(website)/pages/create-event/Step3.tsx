import { Button, Result } from 'antd'
import React from 'react'

function Step3() {
   return (
      <Result
         status="success"
         title="Event Created Successfully!"
         subTitle="Your event has been created successfully."
         extra={[
            <Button type="default" href="/" key="console">
               Back to Home
            </Button>,
         ]}
      />
   )
}

export default Step3
