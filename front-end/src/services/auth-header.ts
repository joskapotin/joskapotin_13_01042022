const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token")
}

function authHeader() {
  const token = getToken()
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
}

export default authHeader
export { getToken }
