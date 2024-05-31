import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isDarkMode: false,
}

const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setDarkMode: (state, action) => {
         state.isDarkMode = action.payload
         localStorage.setItem('darkmode', action.payload.toString())
      },
      initializeTheme: (state) => {
         const savedTheme = localStorage.getItem('darkmode')
         state.isDarkMode = savedTheme === 'true'
      },
   },
})

export const { setDarkMode, initializeTheme } = themeSlice.actions
export default themeSlice.reducer
