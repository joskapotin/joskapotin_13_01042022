const getToken = () => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token")
  return token || null
}

export default {
  getToken,
}
