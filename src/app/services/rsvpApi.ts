import { api } from '@/app/services/api'
import { ICreatersvp, IRsvpCreateResponse, IUpdateRsvp } from '@/types/rsvp'

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
         invalidatesTags: ['UpdateDirectRsvp'],
      }),
      updateOpenRsvp: builder.mutation<any, IUpdateRsvp>({
         query: (body) => ({
            url: '/rsvp/open',
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['UpdateOpenRsvp'],
      }),
   }),
})

export const { useCreateDirectRsvpMutation, useCreateOpenRsvpMutation } =
   rsvpApi
