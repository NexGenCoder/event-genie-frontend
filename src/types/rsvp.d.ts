export type IRsvp = {
   rsvpid: string
   userid: string
   eventid: string
   status: 'accepted' | 'declined' | 'pending'
   expiry_at: Date
   created_at: Date
   updated_at: Date
   is_open_invite: boolean
   user_limit?: number
   claimed_by?: string[]
}

export type ICreatersvp = {
   userid?: string
   eventid: string
   expiry_at: Date
   user_limit?: number // Only for open invites
}

export type IUpdateRsvp = {
   rsvpId: string
   status: 'accepted' | 'declined'
   userId?: string // Only for open invites
}

export type IRsvpCreateResponse = {
   message: string
   data: IRsvp
}
