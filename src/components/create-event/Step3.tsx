import { Button, Result } from 'antd'
import React from 'react'

function Step3() {
   return (
      <Result
         status="success"
         title="Event Created Successfully!"
         subTitle="Your event has been created successfully."
         extra={[
            <Button type="primary" key="console">
               Go to App
            </Button>,
         ]}
      />
   )
}

export default Step3
