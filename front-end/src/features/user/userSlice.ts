import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { ProfileFormData } from '../../pages/profile/profileForm'
import userService from '../../services/user.service'
import type { Profile } from '../../services/user.service'

type GetProfilePayload = {
  message: string
  profile: Profile
}

type updateProfilePayload = GetProfilePayload

type UserState = {
  isLoading: boolean
  isError: boolean
  profile: Profile | null
  isEditing: boolean
  message: string | null
}

const initialState = {
  isLoading: false,
  isError: false,
  isEditing: false,
  profile: null,
  message: null,
} as UserState

const getProfile = createAsyncThunk<GetProfilePayload, void, { rejectValue: string }>(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      const data = await userService.getProfile()
      const { message, body: profile } = data
      return { profile, message }
    } catch (err) {
      const error = err as Error
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const updateProfile = createAsyncThunk<
  updateProfilePayload,
  ProfileFormData,
  { rejectValue: string }
>('user/updateProfile', async (formData, thunkAPI) => {
  try {
    const data = await userService.updateProfile(formData)
    const { message, body: profile } = data
    return { profile, message }
  } catch (err) {
    const error = err as Error
    return thunkAPI.rejectWithValue(error.message)
  }
})

const userSlice = createSlice({
  name: 'user',
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
      state.isError = false
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
      state.isError = false
      state.profile = payload.profile
      state.message = payload.message
      state.isEditing = false
    })
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
    builder.addCase('auth/logout/fulfilled', state => {
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
