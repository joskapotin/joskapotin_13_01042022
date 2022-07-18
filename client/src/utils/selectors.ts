import type { RootState } from "~/store"

export const selectAuth = (state: RootState) => state.auth
export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.user
export const selectFirstName = (state: RootState) => state.user.profile?.firstName
