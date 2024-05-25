export type SendMessageBody = {
   channelid: string
   type: 'text' | 'image' | 'video'
   content: string
}

export type Message = {
   messageid: string
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

export type MessageResponse = {
   message: string
   data: Message
}
