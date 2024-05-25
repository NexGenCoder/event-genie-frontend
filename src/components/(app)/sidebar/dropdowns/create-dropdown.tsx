import { Button, Dropdown, Flex, theme, Tooltip, Typography } from 'antd'
import React from 'react'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import { MdAddCircle, MdPersonAdd } from 'react-icons/md'

const { Text } = Typography

const CreateDropdown = () => {
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
                  >
                     <Text className="text-xs">Invite People</Text>
                  </Button>
                  <Button
                     type="text"
                     className="flex items-center justify-center p-4"
                     icon={<BiSolidMessageSquareAdd color={colorTextBase} />}
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
      </>
   )
}

export default CreateDropdown
