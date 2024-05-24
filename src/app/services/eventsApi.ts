import { api } from '@/app/services/api'
import { IEventTypeResponse } from '@/types/eventTypes'

export const eventsApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getEventTypes: builder.query<IEventTypeResponse, void>({
         query: () => '/event/types',
         providesTags: ['EventTypes'],
      }),
   }),
})

export const { useGetEventTypesQuery } = eventsApi
