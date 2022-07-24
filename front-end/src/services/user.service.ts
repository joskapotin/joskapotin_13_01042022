import axios from "axios"
import CONSTANTS from "~/constants/constants"
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

/* const userService = (callback: any)=>{
  const headers = authHeader()
  if (!headers) return { message: "Please login" }
  return callback(headers)
} */

// Get user profile
const getProfile: GetProfileFunction = async () => {
  const headers = authHeader()
  if (!headers) return { message: "Please login" }
  const response = await axios({
    method: "post",
    url: `${CONSTANTS.API_URL}/profile`,
    headers,
  })
  return response.data
}

// Update user profile
const updateProfile: UpdateProfileFunction = async profile => {
  const headers = authHeader()
  if (!headers) return { message: "Please login" }
  const response = await axios({
    method: "put",
    url: `${CONSTANTS.API_URL}/profile`,
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
