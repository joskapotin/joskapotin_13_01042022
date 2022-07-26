import { selectUser } from '../../helpers/selectors'
import useAppSelector from '../../hooks/useAppSelector'
import MainLayout from '../../layouts/main'
import ProfileForm from '../../pages/profile/profileForm'
import Account from './account'

import './profile.css'

function Profile() {
  const { profile, isLoading, isError, message } = useAppSelector(selectUser)

  if (isLoading) {
    return <MainLayout>Loading...</MainLayout>
  }

  if (isError) {
    return <MainLayout>{message}</MainLayout>
  }

  return (
    <MainLayout bgDark>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {profile?.firstName} {profile?.lastName}!
        </h1>
        <ProfileForm />
      </div>
      <Account />
    </MainLayout>
  )
}

export default Profile
