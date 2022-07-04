import { lazy, Suspense, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import useAppSelector from "./hooks/useAppSelector"
import useAppDispatch from "./hooks/useAppDispatch"
import { getProfile } from "./features/user/userSlice"
import { selectIsAuth } from "./utils/selectors"
import MainNav from "./components/ui/MainNav/MainNav"
import Footer from "./components/ui/Footer/Footer"
import ProtectedRoute from "./ProtectedRoutes"
import ROUTES from "./constants/routes"

const Home = lazy(() => import("./components/pages/Home/Home"))
const SignIn = lazy(() => import("./components/pages/SignIn/SignIn"))
const Profile = lazy(() => import("./components/pages/Profile/Profile"))

function App() {
  const isAuth = useAppSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      // If the user is authenticated, store the profile
      dispatch(getProfile())
    }
  }, [isAuth, dispatch])

  return (
    <div className="App">
      <MainNav />

      <Suspense>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.PROFILE} element={<ProtectedRoute element={<Profile />} redirectTo={ROUTES.HOME} />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  )
}

export default App
