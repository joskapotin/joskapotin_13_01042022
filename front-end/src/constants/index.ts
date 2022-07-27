const CONSTANTS = {
  API_URL: 'http://localhost:3001/api/v1/user',
  API_ENDPOINTS: {
    LOGIN: 'login',
    GET_PROFILE: 'profile',
    UPDATE_PROFILE: 'profile',
  },
  ROUTES: {
    HOME: '/',
    SIGN_IN: '/sign-in',
    PROFILE: '/profile',
  },
  TOKEN: 'token',
} as const

export default CONSTANTS
