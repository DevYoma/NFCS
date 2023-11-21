import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs'

export interface UserInfoState {
    userInfo: null,
    userBirthdayInfo: any
}

const initialState: UserInfoState = {
    userInfo: null,
    userBirthdayInfo: null
}

export const userInfoSlice = createSlice({
  name: 'userInfo', // readUp
  initialState,
  reducers: {
    // },
    loggedIn: (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
    },
    loggedInFailure: (state) => {
      state.userInfo = null
    },
    // logout: (state, action: PayloadAction<number>) => {
    loggedOut: (state) => {
      // localStorage.removeItem(); ITS EITHER YOU REMOVEITEM OR JUST CLEAR 
      // REMOVEITEMS 
      state.userInfo = null;
      state.userBirthdayInfo = null
      // localStorage.removeItem("formValues"); 
    }, 

    userBirthdayDetail: (state, action) => {
      // state.userInfo = action.payload;
      state.userBirthdayInfo = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { userBirthdayDetail ,loggedIn, loggedOut, loggedInFailure } = userInfoSlice.actions

export default userInfoSlice.reducer