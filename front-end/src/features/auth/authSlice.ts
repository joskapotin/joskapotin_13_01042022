import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import CONSTANTS from '../../constants'
import { getWithExpiry, setWithExpiry } from '../../helpers/localStorage'
import type { FormData } from '../../pages/signIn/signInForm'
import authService from '../../services/auth.service'

type AuthState = {
  isLoading: boolean
  isError: boolean
  isAuth: boolean
  message: string | null
}

const initialState = {
  isLoading: false,
  isError: false,
  isAuth: !!getWithExpiry(CONSTANTS.TOKEN),
  message: 'Please Login',
} as AuthState

const weekDuration = 60 * 60 * 24 * 7
const dayDuration = 60 * 60 * 24

const login = createAsyncThunk<string, FormData, { rejectValue: string }>(
  'auth/login',
  async (formData, thunkAPI) => {
    const { email, password, rememberMe } = formData
    try {
      const data = await authService.login({ email, password })
      const { message } = data
      const token = data.body.token
      const expiryDuration = rememberMe ? weekDuration : dayDuration
      setWithExpiry({ key: CONSTANTS.TOKEN, value: token, ttl: expiryDuration })

      return message
    } catch (err) {
      const error = err as Error
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const logout = createAsyncThunk<string, string | undefined, { rejectValue: string }>(
  'auth/logout',
  async (message = 'Logout Successful', thunkAPI) => {
    try {
      await authService.logout(message)
      return message
    } catch (err) {
      const error = err as Error
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logout.pending, state => {
      state.isLoading = true
    })
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isError = false
      state.isAuth = false
      state.message = payload
    })
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
    builder.addCase(login.pending, state => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = true
      state.message = payload
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
  },
})

export default authSlice.reducer
export { login, logout }
