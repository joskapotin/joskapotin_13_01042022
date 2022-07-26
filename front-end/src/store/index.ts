import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {auth: AuthState, user: UserState}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
