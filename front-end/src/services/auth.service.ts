import CONSTANTS from '../constants'
import axiosInstance from './axiosInstance'

export interface LoginProps {
  email: string
  password: string
}

export interface LoginResponse {
  status: string
  message: string
  body?: {
    token: string
  }
}

export type LoginFunction = (props: LoginProps) => Promise<LoginResponse>

export interface LogoutResponse {
  status: string
  message: string
}

export type LogoutFunction = () => Promise<LogoutResponse>

const login: LoginFunction = async ({ email, password }) => {
  const response = await axiosInstance({
    method: 'post',
    url: CONSTANTS.API_ENDPOINTS.LOGIN,
    data: { email, password },
  })
  return response.data
}

const logout: LogoutFunction = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.removeItem('token')
      resolve({ status: 'success', message: 'Logout successful' })
    }, 300)
  })
}

const authService = {
  login,
  logout,
}

export default authService
