import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import ROUTES from "~/constants/routes"
import MainNav from "~/components/MainNav/MainNav"
import Footer from "~/components/Footer/Footer"
import ProtectedRoute from "~/ProtectedRoutes"

const Home = lazy(() => import("~/pages/Home/Home"))
const SignIn = lazy(() => import("~/pages/SignIn/SignIn"))
const Profile = lazy(() => import("~/pages/Profile/Profile"))

function App() {
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
