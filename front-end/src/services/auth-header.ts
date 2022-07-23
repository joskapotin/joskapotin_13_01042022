import { getWithExpiry } from "~/utils/localStorage.helpers"

function authHeader() {
  const token = getWithExpiry("token")
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
}

export default authHeader
