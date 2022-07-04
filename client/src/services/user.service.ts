import axios from "axios"
import type { AxiosResponse } from "axios"
import authHeader from "./auth-header"
import API_URL from "../constants/api"

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
  body: Profile | null
}

export type GetProfileFunction = () => Promise<GetProfileResponse>

export type UpdateProfileProps = {
  firstName: string
  lastName: string
}

export interface UpdateProfileResponse extends AxiosResponse {
  status: number
  message: string
  body: Profile | null
}

export type UpdateProfileFunction = (profile: UpdateProfileProps) => Promise<UpdateProfileResponse>

// Get user profile
const getProfile: GetProfileFunction = async () => {
  const headers = authHeader()
  if (headers) {
    const response = await axios({
      method: "post",
      url: `${API_URL}/profile`,
      headers,
    })
    return response.data
  }
  return Promise.reject(new Error("No token"))
}

// Update user profile
const updateProfile: UpdateProfileFunction = async profile => {
  const headers = authHeader()
  if (headers) {
    const response = await axios({
      method: "put",
      url: `${API_URL}/profile`,
      headers,
      data: profile,
    })
    return response.data
  }
  return Promise.reject(new Error("No token"))
}

export default {
  getProfile,
  updateProfile,
}
