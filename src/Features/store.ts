import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Features/user/userSlice'
import userInfoReducer from '../Features/userInfo/userinfoSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch