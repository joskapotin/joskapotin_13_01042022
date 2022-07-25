import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { AxiosError } from "axios"

import type { FormData } from "../../pages/profile/profileForm"
import userService from "../../services/user"
import type { Profile } from "../../services/user"

export type UserState = {
  isLoading: boolean
  isError: boolean
  profile?: Profile | null
  isEditing: boolean
  message?: string | null
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

const getProfile = createAsyncThunk<ProfileSuccess, void, { rejectValue: ProfileError }>(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const data = await userService.getProfile()
      const { message, body: profile } = data
      return { message, profile }
    } catch (err) {
      const error = err as CustomError
      const message = error.response.data.message
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const updateProfile = createAsyncThunk<ProfileSuccess, FormData, { rejectValue: string }>(
  "user/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const data = await userService.updateProfile(formData)
      const { message, body: profile } = data
      return { message, profile }
    } catch (err) {
      const error = err as CustomError
      const message = error.response.data.message
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
    builder.addCase("auth/logout/fulfilled", state => {
      state.isLoading = false
      state.isError = false
      state.isEditing = false
      state.profile = null
      state.message = null
    })
  },
})

export default userSlice.reducer
export { getProfile, updateProfile }
export const { toggleIsEditing } = userSlice.actions
