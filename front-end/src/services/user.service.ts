import type { AxiosResponse } from "axios"

import axiosInstance from "./api"

export type Profile = {
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  id: string
}

export interface GetProfileResponse extends AxiosResponse {
  status: number
  message: string
  body: Profile
}

export type GetProfileFunction = () => Promise<GetProfileResponse>

export type UpdateProfileProps = {
  firstName: string
  lastName: string
}

export interface UpdateProfileResponse extends AxiosResponse {
  status: number
  message: string
  body: Profile
}

export type UpdateProfileFunction = (profile: UpdateProfileProps) => Promise<UpdateProfileResponse>

// Get user profile
const getProfile: GetProfileFunction = async () => {
  const response = await axiosInstance({
    method: "post",
    url: "profile",
  })
  return response.data
}

// Update user profile
const updateProfile: UpdateProfileFunction = async profile => {
  const response = await axiosInstance({
    method: "put",
    url: "profile",
    data: profile,
  })
  return response.data
}

const userService = {
  getProfile,
  updateProfile,
}

export default userService
