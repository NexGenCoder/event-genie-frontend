import { Col, Layout, Row, theme, Typography } from 'antd'
import React from 'react'

import {
   FacebookOutlined,
   InstagramOutlined,
   TwitterOutlined,
} from '@ant-design/icons'

const { Footer } = Layout
const { Title, Text, Link } = Typography

const AppFooter = () => {
   const {
      token: { colorBgContainer, colorTextBase },
   } = theme.useToken()
   return (
      <Footer
         className="w-full flex flex-col gap-4 items-center justify-center p-6"
         style={{ backgroundColor: colorBgContainer }}
      >
         <div className="max-w-7xl mx-auto">
            <Row gutter={16}>
               <Col xs={24} md={8}>
                  <Title level={4}>Event Genie</Title>
                  <Text>
                     Event Genie is a platform that helps you find and create
                     events that you will love. Discover events tailored to your
                     interests, connect with like-minded individuals, and create
                     memorable experiences.
                  </Text>
               </Col>
               <Col xs={24} md={8}>
                  <Title level={4}>Quick Links</Title>
                  <ul className="gray-400 space-y-2 list-none p-0">
                     <li>
                        <Link href="#">Privacy Policy</Link>
                     </li>
                     <li>
                        <Link href="#">Terms and Conditions</Link>
                     </li>
                     <li>
                        <Link href="#">About Us</Link>
                     </li>
                     <li>
                        <Link href="#">Contact Us</Link>
                     </li>
                     <li>
                        <Link href="#">FAQs</Link>
                     </li>
                  </ul>
               </Col>
               <Col xs={24} md={8}>
                  <Title level={4}>Contact Us</Title>
                  <Text>
                     Email: support@eventgenie.com
                     <br />
                     Phone: +91 1234567890
                  </Text>
                  <div className="mt-4 flex space-x-4">
                     <Link href="#">
                        <FacebookOutlined />
                     </Link>
                     <Link href="#">
                        <TwitterOutlined />
                     </Link>
                     <Link href="#">
                        <InstagramOutlined />
                     </Link>
                  </div>
               </Col>
            </Row>
            <div className="text-center mt-6 text-gray-600">
               © {new Date().getFullYear()} Event Genie. All rights reserved.
            </div>
         </div>
      </Footer>
   )
}

export default AppFooter
