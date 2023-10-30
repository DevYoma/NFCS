import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../Features/user/userSlice'
import userInfoReducer from '../Features/userInfo/userinfoSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  userInfo: userInfoReducer,
})

const persistConfig = {
  key: 'root', 
  version: 1, 
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: false,
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);