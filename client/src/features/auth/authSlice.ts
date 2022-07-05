import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"
import authService from "../../services/auth.service"
import authHelpers from "../../utils/auth.helpers"
import type { FormData } from "../../components/pages/SignIn/SignInForm"

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

const initialState = {
  isLoading: false,
  isAuth: !!authHelpers.getToken(),
  message: undefined,
} as AuthState

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
    logout: state => {
      state.isLoading = false
      state.isAuth = false
      state.message = undefined
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
