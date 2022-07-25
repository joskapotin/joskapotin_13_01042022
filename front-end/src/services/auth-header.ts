import CONSTANTS from "../constants"
import { getWithExpiry } from "../helpers/localStorage"

function authHeader() {
  const token = getWithExpiry(CONSTANTS.TOKEN)
  if (!token) return null
  return { Authorization: `Bearer ${token}` }
}

export default authHeader
