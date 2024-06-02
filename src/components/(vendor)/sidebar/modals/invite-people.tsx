import {
   Button,
   Flex,
   Form,
   Input,
   message,
   Modal,
   Radio,
   Result,
   Select,
   Typography,
} from 'antd'
import React, { useState } from 'react'

import { IUser } from '@/app/services/authApi'
import {
   useCreateDirectRsvpMutation,
   useCreateOpenRsvpMutation,
} from '@/app/services/rsvpApi'
import { IEvent } from '@/types/event'
import { ICreatersvp } from '@/types/rsvp'

const { Text } = Typography
const { Option } = Select

interface CreateRsvpModalProps {
   eventDetails: IEvent
   closeModal: () => void
   isModalOpen: boolean
   users: IUser[]
}

const CreateRsvpModal = ({
   eventDetails,
   closeModal,
   isModalOpen,
   users,
}: CreateRsvpModalProps) => {
   const [form] = Form.useForm()
   const [rsvpType, setRsvpType] = useState<'direct' | 'open'>('direct')
   const [showResult, setShowResult] = useState(false)
   const [messageApi, contextHolder] = message.useMessage()
   const [rsvpId, setRsvpId] = useState('')

   const [createDirectRsvp, { isLoading: isCreatingDirectRsvp }] =
      useCreateDirectRsvpMutation()
   const [createOpenRsvp, { isLoading: isCreatingOpenRsvp }] =
      useCreateOpenRsvpMutation()

   const handleCreateRsvp = async (values: any) => {
      if (rsvpType === 'direct') {
         values &&
            values?.users.forEach(async (user: any) => {
               const requestBody: ICreatersvp = {
                  userid: user,
                  eventid: eventDetails.eventid,
                  expiry_at: values.expiry_at,
               }
               try {
                  await createDirectRsvp(requestBody).unwrap()
                  messageApi
                     .open({
                        type: 'loading',
                        content: `Inviting people...`,
                        duration: 2.5,
                     })
                     .then(() => {
                        messageApi.success(
                           `Invited for ${eventDetails.event_name} successfully`,
                        )
                        setShowResult(true)
                     })
               } catch (error: any) {
                  messageApi.error(error.data.message)
               }
            })
      } else {
         const requestBody: ICreatersvp = {
            eventid: eventDetails.eventid,
            user_limit: values.user_limit,
            expiry_at: values.expiry_at,
         }
         try {
            const response = await createOpenRsvp(requestBody).unwrap()
            messageApi
               .open({
                  type: 'loading',
                  content: `Creating open invite...`,
                  duration: 2.5,
               })
               .then(() => {
                  messageApi.success(`Open invite created`)
                  setRsvpId(response.data.rsvpid)
                  setShowResult(true)
               })
         } catch (error: any) {
            messageApi.error(error.data.message)
         }
      }
   }

   const handleCopyButton = () => {
      navigator.clipboard.writeText(`http://localhost:3000/rsvp/${rsvpId}`)
      messageApi.success('Copied to clipboard')
   }

   return (
      <>
         <Modal
            title={
               showResult
                  ? 'RSVP Created'
                  : rsvpType === 'direct'
                    ? 'Invite People'
                    : 'Create Open Invite'
            }
            onCancel={closeModal}
            footer={null}
            open={isModalOpen}
         >
            {!showResult ? (
               <Form form={form} onFinish={handleCreateRsvp} layout="vertical">
                  <Form.Item label="Select RSVP Type">
                     <Radio.Group
                        onChange={(e) => setRsvpType(e.target.value)}
                        value={rsvpType}
                     >
                        <Radio value="direct">Direct</Radio>
                        <Radio value="open">Open</Radio>
                     </Radio.Group>
                  </Form.Item>

                  {rsvpType === 'direct' && (
                     <>
                        <Form.Item
                           name="users"
                           label="Select Users"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please select users',
                              },
                           ]}
                        >
                           <Select mode="multiple" placeholder="Select users">
                              {users.map((user) => (
                                 <Option key={user.userid} value={user.userid}>
                                    <Text>
                                       {user.firstname} {user.lastname}
                                    </Text>
                                    <Text type="secondary">
                                       {' '}
                                       {user.username}
                                    </Text>
                                 </Option>
                              ))}
                           </Select>
                        </Form.Item>
                     </>
                  )}

                  {rsvpType === 'open' && (
                     <>
                        <Form.Item
                           name="user_limit"
                           label="Limit"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please enter the user_limit',
                              },
                           ]}
                        >
                           <Input type="number" />
                        </Form.Item>
                     </>
                  )}

                  <Form.Item
                     name="expiry_at"
                     label="Expiry Date"
                     rules={[
                        {
                           required: true,
                           message: 'Please select an expiry date',
                        },
                     ]}
                  >
                     <Input type="date" />
                  </Form.Item>

                  <Form.Item>
                     <Flex justify="space-between">
                        <Button type="default" onClick={closeModal}>
                           Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                           Create RSVP
                        </Button>
                     </Flex>
                  </Form.Item>
               </Form>
            ) : (
               <Result
                  status="success"
                  title="Successfully created RSVP"
                  subTitle={
                     rsvpType === 'open'
                        ? `Open invite created. Share the link: http://localhost:3000/rsvp/${rsvpId}`
                        : `Invite sent to ${form.getFieldValue('users').length} users`
                  }
                  extra={[
                     <>
                        {rsvpType === 'open' ? (
                           <>
                              <Button
                                 type="default"
                                 key="close"
                                 onClick={closeModal}
                              >
                                 Close
                              </Button>
                              <Button
                                 type="primary"
                                 key="copy"
                                 onClick={handleCopyButton}
                              >
                                 Copy
                              </Button>
                           </>
                        ) : (
                           <Button
                              type="primary"
                              key="close"
                              onClick={closeModal}
                           >
                              Close
                           </Button>
                        )}
                     </>,
                  ]}
               />
            )}
         </Modal>

         {contextHolder}
      </>
   )
}

export default CreateRsvpModal
