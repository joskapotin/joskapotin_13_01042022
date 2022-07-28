import CONSTANTS from '../constants'
import type { ProfileFormData } from '../pages/profile/profileForm'
import axiosInstance from './axiosInstance'

export type Profile = {
  firstName: string
  lastName: string
  createdAt: string
  email: string
  id: string
  updatedAt: string
}

type GetProfileResponse = {
  status: number
  message: string
  body: Profile
}

type UpdateProfileResponse = GetProfileResponse

// Get user profile
const getProfile = async () => {
  return (await axiosInstance.post(CONSTANTS.API_ENDPOINTS.GET_PROFILE)) as GetProfileResponse
}

// Update user profile
const updateProfile = async (profile: ProfileFormData) => {
  return (await axiosInstance.put(
    CONSTANTS.API_ENDPOINTS.UPDATE_PROFILE,
    profile,
  )) as UpdateProfileResponse
}

const userService = {
  getProfile,
  updateProfile,
}

export default userService
