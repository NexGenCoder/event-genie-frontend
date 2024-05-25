import { api } from '@/app/services/api'
import {
   ICategories,
   IChannelCategoryList,
   IChannelLIst,
   ICreateChannel,
   ICreateChannelCategory,
} from '@/types/channel'
import {
   ICreateEventBody,
   ICreateEventResponse,
   IEventDetailsResponse,
   IEventTypeResponse,
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
      getEventChannels: builder.query<IChannelLIst, string>({
         query: (eventid) => `/event/channels/${eventid}`,
         providesTags: ['EventChannels'],
      }),
      getEventCategories: builder.query<ICategories, string>({
         query: (eventid) => `/event/categories/${eventid}`,
         providesTags: ['EventChannels'],
      }),
      getEventDetails: builder.query<IEventDetailsResponse, string>({
         query: (eventid) => `/event/${eventid}`,
         providesTags: ['EventDetails'],
      }),
      createEventChannel: builder.mutation<any, ICreateChannel>({
         query: (body) => ({
            url: '/event/channel',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['EventChannels'],
      }),
      createEventCategory: builder.mutation<any, ICreateChannelCategory>({
         query: (body) => ({
            url: '/event/category',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['EventCategories'],
      }),
   }),
})

export const {
   useGetEventTypesQuery,
   useCreateEventMutation,
   useGetUserEventsQuery,
   useGetEventChannelsQuery,
   useGetEventCategoriesQuery,
   useGetEventDetailsQuery,
   useCreateEventChannelMutation,
   useCreateEventCategoryMutation,
} = eventsApi
