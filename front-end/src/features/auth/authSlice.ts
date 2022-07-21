import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "~/services/auth.service"
import { getToken } from "~/services/auth-header"

import type { AxiosError } from "axios"
import type { FormData } from "~/components/SignInForm/SignInForm"

export type AuthState = {
  isLoading: boolean
  isError: boolean
  isAuth: boolean
  message?: string
}
export interface CustomError extends Error {
  response: AxiosError & {
    data: {
      message: string
    }
  }
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isAuth: !!getToken(),
}

// Login user
const login = createAsyncThunk<string, FormData, { rejectValue: string }>("auth/login", async (formData, thunkAPI) => {
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
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout user
const logout = createAsyncThunk<void, void, { rejectValue: string }>("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout()
  } catch (err) {
    const error = err as Error
    const message = error.message
    return thunkAPI.rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logout.pending, state => {
      state.isLoading = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.isLoading = false
      state.isError = false
      state.isAuth = false
      state.message = undefined
    })
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload
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
      state.message = payload
    })
  },
})

export default authSlice.reducer
export { login, logout }
