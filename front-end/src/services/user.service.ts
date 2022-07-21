import axios from "axios"
import API_URL from "~/constants/api"
import authHeader from "./auth-header"

import type { AxiosResponse } from "axios"

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
  const headers = authHeader()
  const response = await axios({
    method: "post",
    url: `${API_URL}/profile`,
    headers,
  })
  console.log(response)
  return response.data
}

// Update user profile
const updateProfile: UpdateProfileFunction = async profile => {
  const headers = authHeader()
  const response = await axios({
    method: "put",
    url: `${API_URL}/profile`,
    headers,
    data: profile,
  })
  return response.data
}

const userService = {
  getProfile,
  updateProfile,
}

export default userService
