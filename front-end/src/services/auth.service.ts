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

const login: LoginFunction = async ({ email, password }) => {
  const response = await axios({
    method: "post",
    url: `${API_URL}/login`,
    data: { email, password },
  })
  return response.data
}

const logout = () => {
  sessionStorage.removeItem("token")
  localStorage.removeItem("token")
  window.location.reload()
}

const authService = {
  login,
  logout,
}

export default authService
