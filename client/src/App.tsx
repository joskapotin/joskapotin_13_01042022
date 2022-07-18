import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import ROUTES from "./constants/routes"
import useAppSelector from "./hooks/useAppSelector"
import useAppDispatch from "./hooks/useAppDispatch"
import { getProfile } from "./features/user/userSlice"
import { selectIsAuth } from "./utils/selectors"
import MainNav from "./components/MainNav/MainNav"
import Footer from "./components/Footer/Footer"
import ProtectedRoute from "./ProtectedRoutes"

const Home = lazy(() => import("./pages/Home/Home"))
const SignIn = lazy(() => import("./pages/SignIn/SignIn"))
const Profile = lazy(() => import("./pages/Profile/Profile"))

function App() {
  const isAuth = useAppSelector(selectIsAuth)
  const dispatch = useAppDispatch()

  if (isAuth) {
    // If the user is authenticated, store the profile
    dispatch(getProfile())
  }

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
