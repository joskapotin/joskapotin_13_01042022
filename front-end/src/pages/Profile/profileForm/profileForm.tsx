import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'

import { toggleIsEditing, updateProfile } from '../../../features/user/userSlice'
import { selectUser } from '../../../helpers/selectors'
import useAppDispatch from '../../../hooks/useAppDispatch'
import useAppSelector from '../../../hooks/useAppSelector'

import './profileForm.css'

export type ProfileFormData = {
  firstName: string
  lastName: string
}

function ProfileForm() {
  const dispatch = useAppDispatch()

  const { profile, isEditing } = useAppSelector(selectUser)
  const { firstName, lastName } = profile as ProfileFormData

  const handleEditToggle = () => {
    reset()
    dispatch(toggleIsEditing())
  }

  const handleSaveProfile = (formData: ProfileFormData) => dispatch(updateProfile(formData))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>()

  const onSubmit: SubmitHandler<ProfileFormData> = formData => handleSaveProfile(formData)

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className='edit-user__form'>
          <div className='form-group'>
            <label htmlFor='firstName' className='sr-only'>
              First Name
            </label>
            <input
              id='firstName'
              type='text'
              defaultValue={firstName}
              {...register('firstName', { required: true })}
            />
            {errors.firstName && 'Firstname is required'}
            <label htmlFor='lastName' className='sr-only'>
              Last Name
            </label>
            <input
              id='lastName'
              type='text'
              defaultValue={lastName}
              {...register('lastName', { required: true })}
            />
            {errors.lastName && 'Lastname is required'}
          </div>
          <div className='form-group'>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleEditToggle}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button type='button' onClick={handleEditToggle} className='edit-button'>
          Edit Name
        </button>
      )}
    </>
  )
}

export default ProfileForm
