import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
    userInfo: {},
    userBirthdayInfo: any
}

const initialState: UserInfoState = {
    userInfo: {},
    userBirthdayInfo: null
}

export const userInfoSlice = createSlice({
  name: 'userInfo', // readUp
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
    },
    loggedInFailure: (state) => {
      state.userInfo = {}
    },
    loggedOut: (state) => {
      // REMOVEITEMS 
      state.userInfo = {};
      state.userBirthdayInfo = null
    }, 

    userBirthdayDetail: (state, action) => {
      state.userBirthdayInfo = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userBirthdayDetail ,loggedIn, loggedOut, loggedInFailure } = userInfoSlice.actions

export default userInfoSlice.reducer