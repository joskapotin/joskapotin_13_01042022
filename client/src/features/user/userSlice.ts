import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"
import userService from "../../services/user.service"
import type { FormData } from "../../components/pages/Profile/ProfileForm"
import type { Profile } from "../../services/user.service"

export type AuthState = {
  isLoading: boolean
  isError: boolean
  profile: Profile | null
  isEditing: boolean
  message: string | null
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
  profile: null,
  isEditing: false,
  message: null,
}

export const getProfile = createAsyncThunk("user/getProfile", async (_, thunkAPI) => {
  try {
    const data = await userService.getProfile()
    const { message, body } = data
    return { message, profile: body }
  } catch (err) {
    console.log(err)
    const error = err as CustomError
    const message = error.response.data.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProfile = createAsyncThunk("user/updateProfile", async (formData: FormData, thunkAPI) => {
  try {
    const data = await userService.updateProfile(formData)
    const { message } = data
    return { message, profile: data.body }
  } catch (err) {
    const error = err as CustomError
    const message = error.response.data.message || error.message
    return thunkAPI.rejectWithValue(message)
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleIsEditing: state => {
      state.isEditing = !state.isEditing
    },
  },
  extraReducers: builder => {
    builder.addCase(getProfile.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.profile = payload.profile
      state.message = payload.message
    })
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
    builder.addCase(updateProfile.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.profile = payload.profile
      state.message = payload.message
      state.isEditing = false
    })
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
  },
})

export default userSlice.reducer
export const { toggleIsEditing } = userSlice.actions
