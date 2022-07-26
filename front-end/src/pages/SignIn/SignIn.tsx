import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CONSTANTS from '../../constants'
import { selectAuth } from '../../helpers/selectors'
import useAppSelector from '../../hooks/useAppSelector'
import MainLayout from '../../layouts/main'
import SignInForm from '../../pages/signIn/signInForm'

import './signIn.css'

function SignIn() {
  const { isAuth, isLoading, isError, message } = useAppSelector(selectAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate(CONSTANTS.ROUTES.PROFILE)
    }
  }, [isAuth, navigate])

  return (
    <MainLayout bgDark>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon' />
        <h1>Sign In</h1>
        {isLoading && <p className='loading'>Loading...</p>}
        {isError && message && <p className='error'>{message}</p>}
        <SignInForm />
      </section>
    </MainLayout>
  )
}

export default SignIn
