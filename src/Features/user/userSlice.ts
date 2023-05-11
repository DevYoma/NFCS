import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
//   value: number
    user: boolean
}

const initialState: UserState = {
//   value: 0,
    user: false 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // },
    registeruser: (state) => {
    //   state.value -= 1
    state.user = true
    },

    // logout: (state, action: PayloadAction<number>) => {
        logout: (state) => {
    //   state.value += action.payload
        state.user = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  registeruser, logout } = userSlice.actions

export default userSlice.reducer