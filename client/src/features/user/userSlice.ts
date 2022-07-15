import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"
import userService from "../../services/user.service"
import type { FormData } from "../../components/pages/Profile/ProfileForm"
import type { Profile } from "../../services/user.service"

export type UserState = {
  isLoading: boolean
  isError: boolean
  profile?: Profile
  isEditing: boolean
  message?: string
}

export type ProfileSuccess = {
  message: string
  profile: Profile
}

export type ProfileError = string

export interface CustomError extends Error {
  response: AxiosError & {
    data: {
      message: string
    }
  }
}

const initialState: UserState = {
  isLoading: false,
  isError: false,
  isEditing: false,
}

export const getProfile = createAsyncThunk<ProfileSuccess, void, { rejectValue: ProfileError }>(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const data = await userService.getProfile()
      const { message, body: profile } = data
      return { message, profile }
    } catch (err) {
      const error = err as CustomError
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateProfile = createAsyncThunk<ProfileSuccess, FormData, { rejectValue: ProfileError }>(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const data = await userService.updateProfile(formData)
      const { message, body: profile } = data
      return { message, profile }
    } catch (err) {
      const error = err as CustomError
      const message = error.response.data.message || error.message
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleIsEditing: (state: UserState) => {
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
      state.message = payload
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
      state.message = payload
    })
  },
})

export default userSlice.reducer
export const { toggleIsEditing } = userSlice.actions
