import LoginPage from '@/components/(website)/pages/login/login-page'

export default function Home() {
   return <LoginPage />
}

export function generateMetadata() {
   return {
      title: 'Login - Event Geine',
      description:
         "Event Geine is a platform that helps you find and create events that you'll love.",
      image: '/next.svg',
      url: 'https://eventgeine.com/login',
      keywords: 'events, event creation, event discovery, Event Geine',
      author: 'Event Geine Team',
      og: {
         type: 'website',
         title: 'Login - Event Geine',
         description:
            "Event Geine is a platform that helps you find and create events that you'll love.",
         image: '/next.svg',
         url: 'https://eventgeine.com/login',
         site_name: 'Event Geine',
      },
      twitter: {
         card: 'summary_large_image',
         title: 'Login - Event Geine',
         description:
            "Event Geine is a platform that helps you find and create events that you'll love.",
         image: '/next.svg',
         site: '@eventgeine',
         creator: '@eventgeine',
      },
   }
}
