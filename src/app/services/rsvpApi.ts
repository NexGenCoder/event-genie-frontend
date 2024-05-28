import { api } from '@/app/services/api'
import {
   ICreatersvp,
   IGetUserRsvp,
   IRsvpCreateResponse,
   IUpdateRsvp,
} from '@/types/rsvp'

export const rsvpApi = api.injectEndpoints({
   endpoints: (builder) => ({
      createDirectRsvp: builder.mutation<IRsvpCreateResponse, ICreatersvp>({
         query: (body) => ({
            url: '/rsvp/direct',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['CreateDirectRsvp'],
      }),
      createOpenRsvp: builder.mutation<IRsvpCreateResponse, ICreatersvp>({
         query: (body) => ({
            url: '/rsvp/open',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['CreateOpenRsvp'],
      }),
      updateDirectRsvp: builder.mutation<any, IUpdateRsvp>({
         query: (body) => ({
            url: '/rsvp/direct',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['GetUserRsvp'],
      }),
      updateOpenRsvp: builder.mutation<any, IUpdateRsvp>({
         query: (body) => ({
            url: '/rsvp/open',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['UpdateOpenRsvp'],
      }),
      getUserRsvp: builder.query<IGetUserRsvp, void>({
         query: () => ({
            url: `/rsvp/user`,
            method: 'GET',
         }),
         providesTags: ['GetUserRsvp'],
      }),
   }),
})

export const {
   useCreateDirectRsvpMutation,
   useCreateOpenRsvpMutation,
   useUpdateDirectRsvpMutation,
   useUpdateOpenRsvpMutation,
   useGetUserRsvpQuery,
} = rsvpApi
