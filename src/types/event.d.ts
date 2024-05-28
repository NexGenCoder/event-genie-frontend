export type IEventType = {
   id: number
   name: string
   image_url: string
}

export type IEventTypeResponse = {
   message: string
   data: IEventType[]
}

export type ICreateEventBody = {
   eventName: string
   startDateTime: Date
   endDateTime: Date
   description: string
   location: string
   eventType: string
   eventLogo: string
   isPrivate: boolean
}

export type ICreateEventResponse = {
   message: string
   data: {
      id: number
      eventName: string
      startDateTime: Date
      endDateTime: Date
      description: string
      location: string
      eventType: string
   }
}

export type IEvent = {
   eventid: string
   parent_eventid: string | null
   event_name: string
   start_date_time: string
   end_date_time: string
   description: string
   event_logo: string
   location: string
   event_type: string
   created_at: string
   updated_at: string
   userid: string
   is_private: boolean
   role: 'host' | 'guest' | 'vendor'
   joining_date: string
}

export type IUserEventsList = {
   message: string
   data: IEvent[]
}

export type IEventDetailsResponse = {
   message: string
   data: IEvent
}

export type ICreateChildEventBody = {
   parentId: string
   eventName: string
   startDateTime: Date
   endDateTime: Date
   description: string
   location: string
   eventType: string
   isPrivate: boolean
}

export type IUpdateEvent = {
   eventid: string
   parent_eventid?: string | null
   event_name?: string
   start_date_time?: string
   end_date_time?: string
   description?: string
   event_logo?: string
   location?: string
   event_type?: string
   is_private?: boolean
}
