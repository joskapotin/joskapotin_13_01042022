import CONSTANTS from '../constants'
import axiosInstance from './axiosInstance'

type LoginResponse = {
  status: string
  message: string
  body: {
    token: string
  }
}

type LogoutResponse = {
  status: string
  message: string
}

const login = async ({ email, password }: { email: string; password: string }) => {
  return (await axiosInstance.post(CONSTANTS.API_ENDPOINTS.LOGIN, {
    email,
    password,
  })) as LoginResponse
}

const logout = async (message: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.removeItem(CONSTANTS.TOKEN)
      resolve({ status: 'success', message })
    }, 300)
  }) as Promise<LogoutResponse>
}

const authService = {
  login,
  logout,
}

export default authService
