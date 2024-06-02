import {
   Button,
   Form,
   Input,
   Layout,
   message,
   Modal,
   Radio,
   Typography,
} from 'antd'
import React, { useState } from 'react'

const { Text } = Typography
const { TextArea } = Input

const DeleteAccount = () => {
   const [isModalVisible, setIsModalVisible] = useState(false)
   const [isPermanentDelete, setIsPermanentDelete] = useState(false)

   const showModal = () => {
      setIsModalVisible(true)
   }

   const handleCancel = () => {
      setIsModalVisible(false)
   }

   const handleDelete = async (values: any) => {
      try {
         // Here you would make an API call to delete the account or channel
         message
            .loading('Processing request...', 2.5)
            .then(() => message.success('Request processed successfully'))
         setIsModalVisible(false)
      } catch (error) {
         message.error('Failed to process request. Please try again.')
      }
   }

   return (
      <Layout className="p-6 min-h-screen flex justify-center items-center rounded-xl shadow-md space-y-4">
         <Typography.Title level={2}>Delete Account</Typography.Title>
         <Text>
            You have the option to delete your account. You can choose to
            reactivate your account later or permanently delete it.
         </Text>

         <div className="mt-4">
            <Button type="primary" danger onClick={showModal}>
               Delete Account
            </Button>
         </div>

         <Modal
            title="Delete Account"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={600}
         >
            <Form layout="vertical" onFinish={handleDelete}>
               <Form.Item
                  label="Deletion Type"
                  name="deletionType"
                  rules={[
                     { required: true, message: 'Please select an option' },
                  ]}
               >
                  <Radio.Group
                     onChange={(e) =>
                        setIsPermanentDelete(e.target.value === 'permanent')
                     }
                  >
                     <Radio value="reactivate">Reactivate Later</Radio>
                     <Radio value="permanent">Permanent Delete</Radio>
                  </Radio.Group>
               </Form.Item>

               <Form.Item
                  label="Reason for Deletion"
                  name="deletionNote"
                  rules={[
                     { required: true, message: 'Please provide a reason' },
                  ]}
               >
                  <TextArea rows={4} />
               </Form.Item>

               {isPermanentDelete && (
                  <Text type="danger">
                     Note: Permanent deletion is irreversible.
                  </Text>
               )}

               <Form.Item>
                  <Button
                     type="primary"
                     htmlType="submit"
                     danger
                     className="mt-4 w-full"
                  >
                     {isPermanentDelete ? 'Permanently Delete' : 'Submit'}
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </Layout>
   )
}

export default DeleteAccount
