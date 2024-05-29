import {
   Button,
   Flex,
   Form,
   Input,
   message,
   Modal,
   Result,
   Select,
   Switch,
   Tooltip,
   Typography,
} from 'antd'
import React, { useState } from 'react'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { FaPrayingHands, FaStore } from 'react-icons/fa'
import { GiCook } from 'react-icons/gi'
import { HiLightBulb } from 'react-icons/hi'
import { IoMdHelp } from 'react-icons/io'
import {
   MdLocationOn,
   MdMusicNote,
   MdOutlineEventSeat,
   MdTextsms,
} from 'react-icons/md'
import { RiChatVoiceFill } from 'react-icons/ri'

import {
   useCreateEventCategoryMutation,
   useCreateEventChannelMutation,
   useGetEventCategoriesQuery,
} from '@/app/services/eventsApi'
import {
   IChannelCategory,
   ICreateChannel,
   ICreateChannelCategory,
} from '@/types/channel'
import { IEvent } from '@/types/event'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const { Text } = Typography

const iconMap: { [key: string]: JSX.Element } = {
   pray: <FaPrayingHands />,
   text: <MdTextsms />,
   help: <IoMdHelp />,
   voice: <RiChatVoiceFill />,
   camera: <BsFillCameraReelsFill />,
   cook: <GiCook />,
   music: <MdMusicNote />,
   plan: <HiLightBulb />,
   venue: <MdLocationOn />,
   vendor: <FaStore />,
   decor: <MdOutlineEventSeat />,
}
interface CreateChannelModalProps {
   eventDetails: IEvent
   closeModal: () => void
   isModalOpen: boolean
   categories: IChannelCategory[]
}

const { Option } = Select

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
   eventDetails,
   closeModal,
   isModalOpen,
   categories,
}) => {
   const [form] = Form.useForm()
   const [newCategoryForm] = Form.useForm()
   const [categoryModalOpen, setCategoryModalOpen] = useState(false)
   const [selectedIcon, setSelectedIcon] = useState<string>('text')
   const [messageApi, contextHolder] = message.useMessage()
   const [showResult, setShowResult] = useState(false)

   const [createChannel] = useCreateEventChannelMutation()
   const [createCategory] = useCreateEventCategoryMutation()
   const queryClient = useGetEventCategoriesQuery(eventDetails.eventid)

   const handleCreateChannel = async (values: ICreateChannel) => {
      const requestBody = {
         eventid: eventDetails.eventid,
         categoryid: values.categoryid,
         name: values.name,
         icon: values.icon,
         type: values.type || 'text',
         description: values.description,
         isPrivate: values.isPrivate || true,
      }
      try {
         await createChannel(requestBody).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Creating Channel...',
               duration: 2.5,
            })
            .then(() => {
               messageApi.success(`Channel Created Successfully`)
               setShowResult(true)
            })
         queryClient.refetch()
      } catch (error) {
         messageApi.error("Couldn't create Channel")
         console.error(error)
      }
   }
   const handleCreateCategory = async (values: ICreateChannelCategory) => {
      const requestBody = {
         eventid: eventDetails.eventid,
         name: values.name,
         description: values.description,
      }
      try {
         await createCategory(requestBody).unwrap()
         messageApi
            .open({
               type: 'loading',
               content: 'Creating Category...',
               duration: 2.5,
            })
            .then(() => {
               messageApi.success(`Category Created Successfully`)
               setShowResult(true)
            })
         queryClient.refetch()
         setCategoryModalOpen(false)
      } catch (error) {
         messageApi.error("Couldn't create Category")
      }
   }

   const handleCloseModal = () => {
      setShowResult(false)
      form.resetFields()
      setSelectedIcon('')
      closeModal()
   }

   const handleCategoryCloseModal = () => {
      newCategoryForm.resetFields()
      setCategoryModalOpen(false)
   }
   return (
      <>
         <Modal
            title={showResult ? 'Channel Created' : 'Create a new Channel'}
            onCancel={handleCloseModal}
            footer={null}
            open={isModalOpen}
         >
            {!showResult ? (
               <Form
                  form={form}
                  onFinish={handleCreateChannel}
                  layout="vertical"
                  initialValues={{ categoryid: categories[0]?.categoryid }}
               >
                  <Flex justify="space-between" gap="middle" align="center">
                     <Form.Item
                        name="categoryid"
                        label="Select Channel Category"
                        rules={[
                           {
                              required: true,
                              message: 'Please select a category',
                           },
                        ]}
                        className="w-full"
                     >
                        <Select
                           showSearch
                           placeholder="Select a category"
                           optionFilterProp="children"
                           className="w-full"
                        >
                           {categories.map((category) => (
                              <Option
                                 key={category.categoryid}
                                 value={category.categoryid}
                              >
                                 {category.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                     <Button
                        type="link"
                        onClick={() => setCategoryModalOpen(true)}
                     >
                        Create a new category
                     </Button>
                  </Flex>
                  <Flex justify="space-between" gap="middle">
                     <Form.Item
                        name="name"
                        label="Channel Name"
                        className="w-full"
                        rules={[
                           {
                              required: true,
                              message: 'Please enter channel name',
                           },
                        ]}
                     >
                        <Input />
                     </Form.Item>

                     <Form.Item
                        name="type"
                        label="Select Channel Type"
                        className="w-full"
                     >
                        <Select defaultValue="text">
                           <Option value="text">Text Channel</Option>
                           <Option value="voice">Voice Channel</Option>
                        </Select>
                     </Form.Item>
                  </Flex>

                  <Form.Item
                     name="icon"
                     label="Channel Icon"
                     required
                     rules={[
                        {
                           required: true,
                           message: 'Please select an icon',
                        },
                     ]}
                  >
                     <Flex justify="space-between" gap="middle">
                        <Flex
                           className="flex-wrap"
                           gap="middle"
                           justify="center"
                           align="center"
                        >
                           {Object.keys(iconMap).map((icon) => (
                              <Button
                                 key={icon}
                                 type="default"
                                 className="p-2 cursor-pointer"
                                 onClick={() => {
                                    form.setFieldsValue({ icon })
                                    setSelectedIcon(icon)
                                 }}
                              >
                                 <Tooltip title={icon}>{iconMap[icon]}</Tooltip>
                              </Button>
                           ))}
                        </Flex>
                        <Flex
                           justify="center"
                           align="center"
                           className="w-[20%] border rounded"
                           vertical
                           gap="small"
                        >
                           <Text className="text-4xl">
                              {iconMap[selectedIcon]}
                           </Text>
                           <Text>{selectedIcon}</Text>
                        </Flex>
                     </Flex>
                  </Form.Item>

                  <Form.Item name="description" label="Channel Description">
                     <Input.TextArea rows={1} autoSize />
                  </Form.Item>

                  <Form.Item
                     valuePropName="checked"
                     className="w-full "
                     name="isPrivate"
                     label="Private Channel"
                  >
                     <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                     />
                  </Form.Item>

                  <Form.Item>
                     <Flex justify="end">
                        <Button type="primary" htmlType="submit">
                           Create Channel
                        </Button>
                     </Flex>
                  </Form.Item>
               </Form>
            ) : (
               <Result
                  status="success"
                  title="Successfully Created"
                  subTitle="Channel Created Successfully"
                  extra={[
                     <Button
                        type="primary"
                        key="console"
                        onClick={handleCloseModal}
                     >
                        Close
                     </Button>,
                  ]}
               />
            )}
         </Modal>
         <Modal
            title="Create a new category"
            onCancel={() => setCategoryModalOpen(false)}
            open={categoryModalOpen}
            onOk={newCategoryForm.submit}
         >
            <Form
               layout="vertical"
               form={newCategoryForm}
               onFinish={handleCreateCategory}
            >
               <Form.Item label="Category Name" name="name">
                  <Input />
               </Form.Item>
               <Form.Item label="Category Description" name="description">
                  <Input.TextArea />
               </Form.Item>
            </Form>
         </Modal>
         {contextHolder}
      </>
   )
}

export default CreateChannelModal
