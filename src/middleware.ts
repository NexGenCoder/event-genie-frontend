import { NextResponse } from 'next/server'

import { API } from './constants'

import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
   try {
      const token = request.cookies.get('OG-AUTH')

      if (!token || !token.value) {
         return NextResponse.redirect(new URL('/login', request.url))
      } else {
         const response = await fetch(`${API}/auth/self`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })

         const data = await response.json()

         if (data) {
            return NextResponse.next()
         } else {
            return NextResponse.redirect(new URL('/login', request.url))
         }
      }
   } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
   }
}

export const config = {
   matcher: [
      '/app/:path*',
      '/create-event',
      '/events',
      '/rsvp',
      '/create-profile',
   ],
}
