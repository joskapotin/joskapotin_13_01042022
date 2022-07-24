import { Link } from "react-router-dom"
import CONSTANTS from "~/constants/constants"
import useAppSelector from "~/hooks/useAppSelector"
import useAppDispatch from "~/hooks/useAppDispatch"
import { logout } from "~/features/auth/authSlice"
import { selectIsAuth, selectFirstName } from "~/utils/selectors"
import argentLogo from "~/assets/img/argentBankLogo.png"

function Header() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const firstName = useAppSelector(selectFirstName)

  const handleSignOut = () => {
    dispatch(logout())
  }

  return (
    <nav className="main-nav">
      <Link to={CONSTANTS.ROUTES.HOME} className="main-nav-logo">
        <img className="main-nav-logo-image" src={argentLogo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuth ? (
          <>
            <Link to={CONSTANTS.ROUTES.PROFILE} className="main-nav-item">
              <i className="fa fa-user-circle" aria-hidden="true" />
              {firstName}
            </Link>

            <button type="button" className="main-nav-item sign-out-button" onClick={handleSignOut}>
              <i className="fa fa-sign-out" aria-hidden="true" />
              Sign out
            </button>
          </>
        ) : (
          <Link to={CONSTANTS.ROUTES.SIGN_IN} className="main-nav-item">
            <i className="fa fa-user-circle" aria-hidden="true" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
