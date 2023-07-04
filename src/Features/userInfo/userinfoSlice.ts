import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {
    userInfo: null,
}

const initialState: UserInfoState = {
    userInfo: null,
}

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // },
    loggedIn: (state, action: PayloadAction<any>) => {
        state.userInfo = action.payload;
    },
    // logout: (state, action: PayloadAction<number>) => {
    loggedOut: (state) => {
      // localStorage.removeItem(); ITS EITHER YOU REMOVEITEM OR JUST CLEAR 
      // REMOVEITEMS 
      state.userInfo = null;
      localStorage.removeItem("formValues"); 
    }
  },
})

// Action creators are generated for each case reducer function
export const {  loggedIn, loggedOut } = userInfoSlice.actions

export default userInfoSlice.reducer