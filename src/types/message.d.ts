export type ISendMessageBody = {
   channelid: string
   type: 'text' | 'image' | 'video'
   content: string
   sender: {
      userid: string
      name: string
      avatar: string
   }
   timestamp: string
}

export type IMessage = {
   messageid: string
   channelid: string
   type: 'text' | 'image' | 'video'
   content: string
   timestamp: string
   created_at?: string
   updated_at?: string
   sender: {
      userid: string
      name: string
      username: string
      avatar: string
   }
}
