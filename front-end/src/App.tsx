import { lazy, Suspense, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import CONSTANTS from "~/constants/constants"
import useAppDispatch from "~/hooks/useAppDispatch"
import useAppSelector from "~/hooks/useAppSelector"
import { selectIsAuth } from "~/utils/selectors"
import { getProfile } from "./features/user/userSlice"
import Header from "~/components/Header/Header"
import Footer from "~/components/Footer/Footer"
import ProtectedRoute from "~/ProtectedRoutes"

const Home = lazy(() => import("~/pages/Home/Home"))
const SignIn = lazy(() => import("~/pages/SignIn/SignIn"))
const Profile = lazy(() => import("~/pages/Profile/Profile"))

function App() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfile())
    }
  }, [dispatch, isAuth])

  return (
    <div className="App">
      <Header />

      <Suspense>
        <Routes>
          <Route path={CONSTANTS.ROUTES.HOME} element={<Home />} />
          <Route path={CONSTANTS.ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={CONSTANTS.ROUTES.PROFILE} element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  )
}

export default App
