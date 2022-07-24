import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CONSTANTS from "~/constants/constants"
import useAppSelector from "~/hooks/useAppSelector"
import { selectAuth } from "~/utils/selectors"
import SignInForm from "~/components/SignInForm/SignInForm"

function SignIn() {
  const { isAuth, isLoading, message } = useAppSelector(selectAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate(CONSTANTS.ROUTES.PROFILE)
    }
  }, [isAuth, navigate])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        {isLoading && <p className="loading">Loading...</p>}
        {message && <p className="error">{message}</p>}
        <SignInForm />
      </section>
    </main>
  )
}

export default SignIn
