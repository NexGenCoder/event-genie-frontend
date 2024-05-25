import { api } from '@/app/services/api'
import {
   IEventTypeResponse,
   ICreateEventBody,
   ICreateEventResponse,
   IUserEventsList,
} from '@/types/event'

export const eventsApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getEventTypes: builder.query<IEventTypeResponse, void>({
         query: () => '/event/types',
         providesTags: ['EventTypes'],
      }),
      createEvent: builder.mutation<ICreateEventResponse, ICreateEventBody>({
         query: (body) => ({
            url: '/event',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['CreateEvent'],
      }),
      getUserEvents: builder.query<IUserEventsList, void>({
         query: () => '/events',
         providesTags: ['UserEvents'],
      }),
   }),
})

export const {
   useGetEventTypesQuery,
   useCreateEventMutation,
   useGetUserEventsQuery,
} = eventsApi
