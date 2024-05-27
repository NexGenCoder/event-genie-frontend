import { io } from 'socket.io-client'

import { API } from '@/constants'

const socket = io(API, {
   withCredentials: true,
   extraHeaders: {
      'my-custom-header': 'abcd',
   },
})

export default socket
