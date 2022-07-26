import type { RootState } from '../store'

const selectAuth = (state: RootState) => state.auth
const selectIsAuth = (state: RootState) => state.auth.isAuth
const selectUser = (state: RootState) => state.user
const selectFirstName = (state: RootState) => state.user.profile?.firstName

export { selectAuth, selectIsAuth, selectUser, selectFirstName }
