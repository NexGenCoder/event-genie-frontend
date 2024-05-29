import { api } from '@/app/services/api'
import {
   IDirectMessageInput,
   IMessage,
   ISendMessageBody,
} from '@/types/message'

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
      sendDirectMessages: builder.mutation<void, IDirectMessageInput>({
         query: (body) => ({
            url: 'chats',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['GetDirectMessages'],
      }),
      getDirectMessages: builder.query<
         IMessage[],
         { user1id: string; user2id: string }
      >({
         query: ({ user1id, user2id }) => `/chats/${user1id}/${user2id}`,
         providesTags: ['GetDirectMessages'],
      }),
   }),
})

export const {
   useSendMessagesMutation,
   useGetMessagesQuery,
   useSendDirectMessagesMutation,
   useGetDirectMessagesQuery,
} = messageApi
