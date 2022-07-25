import axios from "axios"

import CONSTANTS from "../constants"
import authHeader from "../helpers/authHeader"

/* Creating a new instance of axios. */
const axiosInstance = axios.create()

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
  err => Promise.reject(err),
)

export default axiosInstance
