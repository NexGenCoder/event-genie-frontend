import { Button, Flex, Layout, theme, Typography } from 'antd'
import moment from 'moment'
import { useMemo } from 'react'
import { Views } from 'react-big-calendar'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
const { Text } = Typography

const VIEW_OPTIONS = [
   { id: Views.DAY, label: 'Day' },
   { id: Views.WEEK, label: 'Week' },
   { id: Views.MONTH, label: 'Month' },
]

interface CalendarToolbarProps {
   view: string
   setView: (view: any) => void
   date: Date
   setDate: (date: Date) => void
}

function CalendarToolbar({
   view,
   setView,
   date,
   setDate,
}: CalendarToolbarProps) {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   const fetchDataWithDate = (newDate: moment.Moment, view: string) => {
      let startDate, endDate
      if (view === Views.MONTH) {
         startDate = moment(newDate).startOf('month').format('YYYY-MM-DD')
         endDate = moment(newDate).endOf('month').format('YYYY-MM-DD')
      } else if (view === Views.WEEK) {
         startDate = moment(newDate).startOf('week').format('YYYY-MM-DD')
         endDate = moment(newDate).endOf('week').format('YYYY-MM-DD')
      } else if (view === Views.AGENDA) {
         startDate = moment(newDate).startOf('month').format('YYYY-MM-DD')
         endDate = moment(newDate).endOf('month').format('YYYY-MM-DD')
      } else if (view === Views.DAY) {
         startDate = moment(newDate).startOf('day').format('YYYY-MM-DD')
         endDate = moment(newDate).endOf('day').format('YYYY-MM-DD')
      }
   }
   const onPrevClick = () => {
      let newDate
      if (view === Views.DAY) {
         newDate = moment(date).subtract(1, 'd')
      } else if (view === Views.WEEK) {
         newDate = moment(date).subtract(1, 'w')
      } else {
         newDate = moment(date).subtract(1, 'M')
      }
      setDate(newDate.toDate())
      fetchDataWithDate(newDate, view)
   }

   const onNextClick = () => {
      let newDate
      if (view === Views.DAY) {
         newDate = moment(date).add(1, 'd')
      } else if (view === Views.WEEK) {
         newDate = moment(date).add(1, 'w')
      } else {
         newDate = moment(date).add(1, 'M')
      }
      setDate(newDate.toDate())
      fetchDataWithDate(newDate, view)
   }

   const goToToday = () => {
      const today = moment()
      setDate(today.toDate())
      fetchDataWithDate(today, view)
   }

   const dateText = useMemo(() => {
      if (view === Views.DAY) return moment(date).format('dddd, MMMM DD')
      if (view === Views.WEEK) {
         const from = moment(date)?.startOf('week')
         const to = moment(date)?.endOf('week')
         return `${from.format('MMMM DD')} to ${to.format('MMMM DD')}`
      }
      if (view === Views.MONTH) {
         return moment(date).format('MMMM YYYY')
      }
   }, [view, date])

   return (
      <Layout className="flex gap-4 md:flex-row flex-col-reverse md:justify-between justify-center items-center w-full">
         <Flex gap="small" justify="center">
            <Flex gap="small">
               <Button
                  onClick={onPrevClick}
                  title="Privious"
                  icon={<MdOutlineNavigateBefore />}
               />

               <Button
                  onClick={onNextClick}
                  title="Next"
                  icon={<MdOutlineNavigateNext />}
               />
            </Flex>
            <Button onClick={goToToday} title="Today">
               Today
            </Button>
         </Flex>
         <Text className="py-2 px-4 font-bold drop-shadow-lg text-center">
            {dateText}
         </Text>

         <Flex gap="small">
            <Flex gap="small">
               {VIEW_OPTIONS.map(({ id, label }) => (
                  <Button
                     key={id}
                     onClick={() => setView(id)}
                     type={view === id ? 'primary' : 'default'}
                     title={label}
                  >
                     {label}
                  </Button>
               ))}
            </Flex>
         </Flex>
      </Layout>
   )
}

export default CalendarToolbar
