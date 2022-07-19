const getToken = () => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  return token
}

function authHeader() {
  const token = getToken()
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
}

export default authHeader
export { getToken }
