const CONSTANTS = {
  API_URL: "http://localhost:3001/api/v1/user",
  ROUTES: {
    HOME: "/",
    SIGN_IN: "/sign-in",
    PROFILE: "/profile",
  },
  TOKEN: "token",
} as const

export default CONSTANTS
