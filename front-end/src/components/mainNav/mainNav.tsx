import { Link } from 'react-router-dom'

import argentLogo from '../../assets/images/argentBankLogo.png'
import CONSTANTS from '../../constants'
import { logout } from '../../features/auth/authSlice'
import { selectFirstName, selectIsAuth } from '../../helpers/selectors'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'

import './mainNav.css'

function MainNav() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const firstName = useAppSelector(selectFirstName)

  const handleSignOut = () => {
    dispatch(logout())
  }

  return (
    <nav className='main-nav'>
      <Link to={CONSTANTS.ROUTES.HOME} className='main-nav-logo'>
        <img className='main-nav-logo-image' src={argentLogo} alt='Argent Bank Logo' />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {isAuth ? (
          <>
            <Link to={CONSTANTS.ROUTES.PROFILE} className='main-nav-item'>
              <i className='fa fa-user-circle' aria-hidden='true' />
              {firstName}
            </Link>

            <button type='button' className='main-nav-item sign-out-button' onClick={handleSignOut}>
              <i className='fa fa-sign-out' aria-hidden='true' />
              Sign out
            </button>
          </>
        ) : (
          <Link to={CONSTANTS.ROUTES.SIGN_IN} className='main-nav-item'>
            <i className='fa fa-user-circle' aria-hidden='true' />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default MainNav
