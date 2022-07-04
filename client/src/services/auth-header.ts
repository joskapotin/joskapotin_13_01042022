import authHelpers from "../utils/auth.helpers"

export default function authHeader() {
  const token = authHelpers.getToken()
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return null
}
