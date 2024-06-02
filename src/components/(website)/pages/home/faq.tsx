import { Collapse, CollapseProps, Layout, theme, Typography } from 'antd'
import React from 'react'

import { CaretRightOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const faqData: CollapseProps['items'] = [
   {
      key: '1',
      label: 'What is Event Genie?',
      children: (
         <Text>
            Event Genie is a platform that helps you find and create events that
            you will love. Discover events tailored to your interests, connect
            with like-minded individuals, and create memorable experiences.
         </Text>
      ),
   },
   {
      key: '2',
      label: 'How do I create an event?',
      children: (
         <Text>
            To create an event, sign up or log in to your account. Once logged
            in, navigate to the Create Event section, fill out the required
            details, and submit your event for approval.
         </Text>
      ),
   },
   {
      key: '3',
      label: 'How can I find events near me?',
      children: (
         <Text>
            Use the Events section to browse events based on your location and
            interests. You can also use the search bar to find specific events.
         </Text>
      ),
   },
   {
      key: '4',
      label: 'Can I invite friends to an event?',
      children: (
         <Text>
            Yes, you can invite friends to any event you create or are
            attending. Simply go to the event page and use the invite option to
            send invitations.
         </Text>
      ),
   },
   {
      key: '5',
      label: 'What types of events can I find on Event Genie?',
      children: (
         <Text>
            Event Genie offers a wide variety of events including concerts,
            workshops, conferences, meetups, and more. Whatever your interest,
            you are sure to find something that suits you.
         </Text>
      ),
   },
]

function FrequentlyAskQuestion() {
   const { token } = theme.useToken()

   const panelStyle: React.CSSProperties = {
      marginBottom: 24,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none',
   }

   return (
      <Layout className="w-full flex flex-col gap-4 items-center justify-center md:w-[80%] min-h-screen">
         <Title className="lg:text-4xl md:text-3xl text-2xl font-bold ">
            Frequently Asked Questions
         </Title>

         <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            className="w-full"
            expandIcon={({ isActive }) => (
               <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ background: token.colorBgContainer }}
            items={faqData}
         />
      </Layout>
   )
}

export default FrequentlyAskQuestion
