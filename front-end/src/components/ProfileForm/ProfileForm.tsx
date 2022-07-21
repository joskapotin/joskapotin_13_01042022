import { useForm } from "react-hook-form"
import useAppSelector from "~/hooks/useAppSelector"
import useAppDispatch from "~/hooks/useAppDispatch"
import { updateProfile, toggleIsEditing } from "~/features/user/userSlice"
import { selectUser } from "~/utils/selectors"

import type { SubmitHandler } from "react-hook-form"
import type { Profile } from "~/services/user.service"

export type FormData = {
  firstName: string
  lastName: string
}

function ProfileForm() {
  const dispatch = useAppDispatch()

  const { profile, isEditing } = useAppSelector(selectUser)
  const { firstName, lastName } = profile as Profile

  const handleEditToggle = () => dispatch(toggleIsEditing())

  const handleSaveProfile = (formData: FormData) => dispatch(updateProfile(formData))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = formData => handleSaveProfile(formData)

  if (!isEditing)
    return (
      <button type="button" onClick={handleEditToggle} className="edit-button">
        Edit Name
      </button>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-user__form">
      <div className="form-group">
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input id="firstName" type="text" defaultValue={firstName} {...register("firstName", { required: true })} />
        {errors.firstName && "Firstname is required"}
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input id="lastName" type="text" defaultValue={lastName} {...register("lastName", { required: true })} />
        {errors.lastName && "Lastname is required"}
      </div>
      <div className="form-group">
        <button type="submit">Save</button>
        <button type="button" onClick={handleEditToggle}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProfileForm
