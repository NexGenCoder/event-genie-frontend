import { api } from '@/app/services/api'
import { IUpdateUser, IUpdateUserResponse, IUserResponse } from '@/types/user'

type ISendOtp = {
   mobile: string
   country_code: string
}

type IVerifyOtp = {
   mobile: string
   otp: string
   userid?: string
}

type ISendOtpResponse = {
   message: string
   data: {
      otp: string
      mobile: string
      country_code: string
      expiresat: string
   }
}

export type IUser = {
   userid: string
   username?: string
   firstname: string
   lastname: string
}

type IGetUsersResponse = {
   message: string
   users: IUser[]
}

type ICheckusernameResponse = {
   exists: boolean
}

type ILoginDemoUser = {
   username: string
}
export const authApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getSelf: builder.query<IUserResponse, void>({
         query: () => '/auth/self',
         providesTags: ['Self', 'AddUserDetails'],
      }),
      sendOtp: builder.mutation<ISendOtpResponse, ISendOtp>({
         query: (body) => ({
            url: '/auth/send-otp',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['SendOtp'],
      }),
      verifyOtp: builder.mutation<IUserResponse, IVerifyOtp>({
         query: (body) => ({
            url: '/auth/verify-otp',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['VerifyOtp'],
      }),
      demoUserLogin: builder.mutation<IUserResponse, ILoginDemoUser>({
         query: (body) => ({
            url: '/auth/demo-user-login',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Self'],
      }),
      updateUserDetails: builder.mutation<IUpdateUserResponse, IUpdateUser>({
         query: (body) => ({
            url: '/auth/add-user-details',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['AddUserDetails', 'Self'],
      }),
      logout: builder.mutation<void, void>({
         query: () => ({
            url: '/auth/logout',
            method: 'POST',
         }),
         invalidatesTags: ['Logout'],
      }),
      checkusername: builder.query<ICheckusernameResponse, string>({
         query: (searchString) => ({
            url: `/user/exists/${searchString}`,
            method: 'GET',
         }),
         providesTags: ['CheckUsername'],
      }),
      getUsers: builder.query<IGetUsersResponse, void>({
         query: () => '/users',
         providesTags: ['Users'],
      }),
      getDemoUser: builder.query<IGetUsersResponse, void>({
         query: () => '/demo-user',
         providesTags: ['DemoUser'],
      }),
   }),
})
export const {
   useSendOtpMutation,
   useVerifyOtpMutation,
   useDemoUserLoginMutation,
   useLogoutMutation,
   useUpdateUserDetailsMutation,
   useGetSelfQuery,
   useCheckusernameQuery,
   useGetUsersQuery,
   useGetDemoUserQuery,
} = authApi
