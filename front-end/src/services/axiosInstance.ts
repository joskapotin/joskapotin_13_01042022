import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'

import CONSTANTS from '../constants'
import authHeader from '../helpers/authHeader'

interface CustomResponse extends AxiosResponse {
  status: number
  message: string
}
interface CustomError extends AxiosError {
  response?: CustomResponse
}

/* Creating a new instance of axios. */
const axiosInstance = axios.create()

/* Handle error */
const handleError = (error: CustomError | AxiosError) => {
  return Promise.reject(
    new Error(error.response?.data?.message || error.message || 'Something went wrong'),
  )
}

/* Adding the authorization header to the request. */
axiosInstance.interceptors.request.use(
  config => {
    const newConfig = config
    newConfig.baseURL = CONSTANTS.API_URL
    if (authHeader()) {
      newConfig.headers = authHeader() as { Authorization: string }
    }
    return newConfig
  },
  error => handleError(error),
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => handleError(error),
)

export default axiosInstance
