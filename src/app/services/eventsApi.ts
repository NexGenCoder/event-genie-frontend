import { create } from 'domain'

import { api } from '@/app/services/api'
import {
   ICategories,
   IChannelDetails,
   IChannelLIst,
   ICreateChannel,
   ICreateChannelCategory,
} from '@/types/channel'
import {
   ICreateChildEventBody,
   ICreateEventBody,
   ICreateEventResponse,
   IEventDetailsResponse,
   IEventTypeResponse,
   IGuestsResponse,
   IUserEventsList,
} from '@/types/event'

export type IUpdateEvent = {
   eventid: string
   parent_eventid?: string | null
   event_name?: string
   start_date_time?: string
   end_date_time?: string
   description?: string
   event_logo?: string
   location?: string
   event_type?: string
}

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
      getChannelDetails: builder.query<IChannelDetails, string>({
         query: (channelId) => `/channel/${channelId}`,
         providesTags: ['ChannelDetails'],
      }),
      updateEvent: builder.mutation<any, IUpdateEvent>({
         query: (body) => ({
            url: `/event/${body.eventid}`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['EventDetails', 'UserEvents'],
      }),
      createChildEvent: builder.mutation<any, ICreateChildEventBody>({
         query: (body) => ({
            url: '/event/child',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['UserEvents'],
      }),
      getUserDetails: builder.query<any, string>({
         query: (guestlistid) => `/event/guest/${guestlistid}`,
      }),
      getEventUserList: builder.query<IGuestsResponse, string>({
         query: (eventid) => `/event/guests/${eventid}`,
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
   useGetChannelDetailsQuery,
   useUpdateEventMutation,
   useCreateChildEventMutation,
   useGetUserDetailsQuery,
   useGetEventUserListQuery,
} = eventsApi
