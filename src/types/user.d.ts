export type IUser = {
   userid: string
   username: string
   email: string
   firstname: string
   lastname: string
   profile_picture: string
   bio: string
   is_mobile_verified: boolean
   is_email_verified: boolean
   is_profile_completed: boolean
}

export type IUserResponse = {
   message: string
   data: IUser
}
