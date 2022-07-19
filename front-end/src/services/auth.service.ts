import axios from "axios"
import API_URL from "~/constants/api"

export type LoginProps = {
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
  const response = await axios({
    method: "post",
    url: `${API_URL}/login`,
    data: { email, password },
  })
  return response.data
}

const logout: LogoutFunction = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      sessionStorage.removeItem("token")
      localStorage.removeItem("token")
      window.location.reload()
      resolve({ status: "success", message: "Logout successful" })
    }, 300)
  })
}

const authService = {
  login,
  logout,
}

export default authService
