import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import { login } from '../../../features/auth/authSlice'
import useAppDispatch from '../../../hooks/useAppDispatch'

import './signInForm.css'

export type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

function SignInForm() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = formData => dispatch(login(formData))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='input-wrapper'>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' {...register('email', { required: true })} />
        {errors.email?.type && 'Email is required'}
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' {...register('password', { required: true })} />
        {errors.password?.type && 'Password is required'}
      </div>
      <div className='input-remember'>
        <input type='checkbox' id='remember-me' {...register('rememberMe')} />
        <label htmlFor='remember-me'>Remember me</label>
      </div>
      <button type='submit' className='sign-in-button'>
        Sign In
      </button>
    </form>
  )
}

export default SignInForm
