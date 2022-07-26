import CONSTANTS from '../constants'
import axiosInstance from './axiosInstance'

export interface Profile {
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface GetProfileResponse {
  status: number
  message: string
  body: Profile
}

export type GetProfileFunction = () => Promise<GetProfileResponse>

export type UpdateProfileProps = {
  firstName: string
  lastName: string
}

export interface UpdateProfileResponse {
  status: number
  message: string
  body: Profile
}

export type UpdateProfileFunction = (profile: UpdateProfileProps) => Promise<UpdateProfileResponse>

// Get user profile
const getProfile: GetProfileFunction = async () => {
  const response = await axiosInstance({
    method: 'post',
    url: CONSTANTS.API_ENDPOINTS.GET_PROFILE,
  })
  return response.data
}

// Update user profile
const updateProfile: UpdateProfileFunction = async profile => {
  const response = await axiosInstance({
    method: 'put',
    url: CONSTANTS.API_ENDPOINTS.UPDATE_PROFILE,
    data: profile,
  })
  return response.data
}

const userService = {
  getProfile,
  updateProfile,
}

export default userService
