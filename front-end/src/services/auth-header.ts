import CONSTANTS from "~/constants/constants"
import { getWithExpiry } from "~/utils/localStorage.helpers"

function authHeader() {
  const token = getWithExpiry(CONSTANTS.TOKEN)
  if (!token) return null
  return { Authorization: `Bearer ${token}` }
}

export default authHeader
