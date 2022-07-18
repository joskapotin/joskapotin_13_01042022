import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "~/services/auth.service"
import { getToken } from "~/services/auth-header"

import type { AxiosError } from "axios"
import type { FormData } from "~/pages/SignIn/SignInForm"

export type AuthState = {
  isLoading: boolean
  isAuth: boolean
  message?: string
}

export type LoginSuccess = string

export type LoginError = string

export interface CustomError extends Error {
  response: AxiosError & {
    data: {
      message: string
    }
  }
}

const initialState: AuthState = {
  isLoading: false,
  isAuth: !!getToken(),
}

// Login user
export const login = createAsyncThunk<LoginSuccess, FormData, { rejectValue: LoginError }>(
  "auth/login",
  async (formData, thunkAPI) => {
    const { email, password, rememberMe } = formData
    try {
      const data = await authService.login({ email, password })
      const { message } = data
      const token = data.body?.token

      if (token) {
        switch (rememberMe) {
          case true:
            localStorage.setItem("token", token)
            break
          case false:
            sessionStorage.setItem("token", token)
            break
          default:
            break
        }
      }

      return message
    } catch (err) {
      const error = err as CustomError
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isLoading = false
      state.isAuth = false
      state.message = "Logout successful"
      authService.logout()
    },
  },
  extraReducers: builder => {
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
      state.message = payload
    })
  },
})

export default authSlice.reducer
export const { logout } = authSlice.actions
