import { selectUser } from "../../helpers/selectors"
import useAppSelector from "../../hooks/useAppSelector"
import MainLayout from "../../layouts/main"
import ProfileForm from "../../pages/profile/profileForm"
import Account from "./account"

import "./profile.css"

function Profile() {
  const { profile, isLoading, isError, message } = useAppSelector(selectUser)

  return (
    <MainLayout bgDark>
      {isLoading && <p>isLoading...</p>}
      {isError && <p>{message}</p>}
      <div className="header">
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
