import * as PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import CONSTANTS from './constants'
import { selectIsAuth } from './helpers/selectors'
import useAppSelector from './hooks/useAppSelector'

type ProtectedRouteProps = {
  element: JSX.Element
  redirectTo: typeof CONSTANTS.ROUTES[keyof typeof CONSTANTS.ROUTES]
}

/**
 * If the user is authenticated, render the element, otherwise redirect to the home page
 */
function ProtectedRoute({ element, redirectTo = CONSTANTS.ROUTES.HOME }: ProtectedRouteProps) {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (isAuth) {
    return element
  }
  return <Navigate replace state={{ from: location }} to={redirectTo} />
}

export default ProtectedRoute

ProtectedRoute.defaultProps = {
  redirectTo: CONSTANTS.ROUTES.HOME,
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
}
