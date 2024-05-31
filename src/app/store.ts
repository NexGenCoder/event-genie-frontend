import { api } from '@/app/services/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import themeReducer from './themeSlice'

const rootReducer = combineReducers({
   [api.reducerPath]: api.reducer,
   theme: themeReducer,
})

export const store = () => {
   return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(api.middleware),
   })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']
