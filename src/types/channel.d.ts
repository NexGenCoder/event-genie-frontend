export type CreateChannelCategoryBody = {
   eventid: string
   name: string
   isPrivate: boolean
}

export type CreateChannelBody = {
   categoryid: string
   eventid: string
   name: string
   type: 'text' | 'voice'
   icon: string
   description: string
   isPrivate: boolean
}

export type Channel = {
   channelid: string
   categoryid: string
   eventid: string
   name: string
   icon: string
   type: 'text' | 'voice'
   description: string
   isPrivate: boolean
}

export type ChannelCategory = {
   categoryid: string
   eventid: string
   name: string
   isPrivate: boolean
   channels: Channel[]
}

export type ChannelLIst = {
   message: string
   data: ChannelCategory[]
}
