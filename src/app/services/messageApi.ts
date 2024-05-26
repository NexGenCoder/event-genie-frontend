import { api } from '@/app/services/api'
import { IMessage, ISendMessageBody } from '@/types/message'

export const messageApi = api.injectEndpoints({
   endpoints: (builder) => ({
      sendMessages: builder.mutation<
         void,
         { channelId: string; body: ISendMessageBody }
      >({
         query: ({ channelId, body }) => ({
            url: `/channels/${channelId}/messages`,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['GetMessages'],
      }),
      getMessages: builder.query<IMessage[], string>({
         query: (channelId) => `/channels/${channelId}/messages`,
         providesTags: ['GetMessages'],
      }),
   }),
})

export const { useSendMessagesMutation, useGetMessagesQuery } = messageApi
