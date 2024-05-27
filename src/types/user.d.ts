export type IUser = {
   userid: string
   username: string
   email: string
   firstname: string
   googleid?: string
   mobile?: string
   created_at?: string
   updated_at?: string
   lastname: string
   profile_picture: string
   bio: string
   is_mobile_verified: boolean
   is_email_verified: boolean
   is_profile_completed: boolean
   is_account_suspended: boolean
}

export type IUserResponse = {
   message: string
   data: IUser
}

export type IUpdateUser = {
   firstname: string
   lastname: string
   profilePicture: string
   username: string
   mobile: string
   bio: string
}

export type IUpdateUserResponse = {
   message: string
   data: IUser
}
