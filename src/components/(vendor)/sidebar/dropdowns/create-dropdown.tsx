import { Button, Dropdown, Flex, theme, Tooltip, Typography } from 'antd'
import React from 'react'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import { MdAddCircle, MdPersonAdd } from 'react-icons/md'

import { useGetUsersQuery } from '@/app/services/authApi'
import { useGetEventCategoriesQuery } from '@/app/services/eventsApi'
import { IEvent } from '@/types/event'

import CreateChannelModal from '../modals/create-channel'
import CreateRsvpModal from '../modals/invite-people'

const { Text } = Typography

//
interface CreateDropdownProps {
   eventDetails: IEvent
}

const CreateDropdown = ({ eventDetails }: CreateDropdownProps) => {
   const [createChannelModal, setCreateChannelModal] = React.useState(false)
   const [createRsvpModal, setCreateRsvpModal] = React.useState(false)
   const { data: categories } = useGetEventCategoriesQuery(eventDetails.eventid)
   const { data: users, isLoading } = useGetUsersQuery()

   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <>
         <Dropdown
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
            overlay={
               <Flex
                  vertical
                  className="p-2 rounded-md"
                  style={{ backgroundColor: colorBgContainer }}
               >
                  <Button
                     type="text"
                     className="flex items-center justify-center p-4"
                     icon={<MdPersonAdd color={colorTextBase} />}
                     onClick={() => setCreateRsvpModal(true)}
                  >
                     <Text className="text-xs">Invite People</Text>
                  </Button>
                  <Button
                     type="text"
                     className="flex items-center justify-center p-4"
                     icon={<BiSolidMessageSquareAdd color={colorTextBase} />}
                     onClick={() => setCreateChannelModal(true)}
                  >
                     <Text className="text-xs">Text Channel</Text>
                  </Button>
               </Flex>
            }
         >
            <Tooltip title="Create" placement="right">
               <Button
                  type="text"
                  icon={<MdAddCircle size={40} color={colorTextBase} />}
               />
            </Tooltip>
         </Dropdown>
         {categories && (
            <CreateChannelModal
               closeModal={() => setCreateChannelModal(false)}
               isModalOpen={createChannelModal}
               eventDetails={eventDetails}
               categories={categories.data}
            />
         )}
         {createRsvpModal && users && (
            <CreateRsvpModal
               closeModal={() => setCreateRsvpModal(false)}
               isModalOpen={createRsvpModal}
               eventDetails={eventDetails}
               users={users.users}
            />
         )}
      </>
   )
}

export default CreateDropdown
