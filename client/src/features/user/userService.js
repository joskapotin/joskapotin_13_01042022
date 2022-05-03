import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user'
const token = JSON.parse(localStorage.getItem('token'))

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

// Get user profile
const getProfile = async () => {
  const { data } = await axios({
    method: 'post',
    url: `${API_URL}/profile`
  })

  if (data.body) {
    localStorage.setItem('profile', JSON.stringify(data.body))
  }

  return data.body
}

// Update user profile
const updateProfile = async (profile) => {
  const { data } = await axios({
    method: 'put',
    url: `${API_URL}/profile`,
    data: profile
  })

  if (data.body) {
    localStorage.setItem('profile', JSON.stringify(data.body))
  }

  return data.body
}

const userService = {
  getProfile,
  updateProfile
}

export default userService