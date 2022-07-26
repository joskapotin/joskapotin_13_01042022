import CONSTANTS from '../constants'
import axiosInstance from './axiosInstance'

type LoginProps = {
  email: string
  password: string
}

type LoginResponse = {
  status: string
  message: string
  body?: {
    token: string
  }
}

type LoginFunction = (props: LoginProps) => Promise<LoginResponse>

type LogoutResponse = {
  status: string
  message: string
}

type LogoutFunction = () => Promise<LogoutResponse>

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
