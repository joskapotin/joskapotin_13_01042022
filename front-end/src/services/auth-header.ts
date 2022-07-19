const getToken = () => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  return token || null
}

function authHeader() {
  const token = getToken()
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return null
}

export default authHeader
export { getToken }
