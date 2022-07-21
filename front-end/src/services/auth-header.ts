import itemStorage from "~/utils/itemStorage.helpers"

function authHeader() {
  const token = itemStorage.getWithExpiry("token")
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
}

export default authHeader
