// pages/index.tsx

import EventCreation from './EventCreation'

const HomePage: React.FC = () => {
   return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <EventCreation />
      </div>
   )
}

export default HomePage
