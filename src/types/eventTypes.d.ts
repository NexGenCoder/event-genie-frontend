export type IEventType = {
   id: number
   name: string
   image_url: string
}

export type IEventTypeResponse = {
   message: string
   data: IEventType[]
}
