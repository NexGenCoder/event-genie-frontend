import { API } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
   baseUrl: API,
   credentials: 'include',
})

export const api = createApi({
   baseQuery,
   tagTypes: [
      'SendOtp',
      'VerifyOtp',
      'Logout',
      'AddUserDetails',
      'Self',
      'CheckUsername',
      'EventTypes',
      'CreateEvent',
      'UserEvents',
      'EventChannels',
      'EventCategories',
      'EventDetails',
      'CreateEventChannel',
      'CreateEventCategory',
      'Users',
      'CreateDirectRsvp',
      'CreateOpenRsvp',
      'UpdateDirectRsvp',
      'UpdateOpenRsvp',
      'SendMessages',
      'GetMessages',
      'ChannelDetails',
      'GetUserRsvp',
      'UpdateEvent',
      'GetDirectMessages',
      'CreateVendor',
   ],
   endpoints: () => ({}),
})
