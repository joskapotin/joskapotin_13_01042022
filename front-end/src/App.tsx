import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import CONSTANTS from './constants'
import { getProfile } from './features/user/userSlice'
import { selectIsAuth } from './helpers/selectors'
import useAppDispatch from './hooks/useAppDispatch'
import useAppSelector from './hooks/useAppSelector'
import ProtectedRoute from './ProtectedRoutes'

const Home = lazy(() => import('./pages/home'))
const SignIn = lazy(() => import('./pages/signIn'))
const Profile = lazy(() => import('./pages/profile'))

function App() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfile())
    }
  }, [dispatch, isAuth])

  return (
    <Suspense>
      <Routes>
        <Route path={CONSTANTS.ROUTES.HOME} element={<Home />} />
        <Route path={CONSTANTS.ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={CONSTANTS.ROUTES.PROFILE} element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </Suspense>
  )
}

export default App
