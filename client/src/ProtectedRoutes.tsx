import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import { selectIsAuth } from "./utils/selectors"
import ROUTES from "./constants/routes"

export type ProtectedRouteProps = {
  element: JSX.Element
  redirectTo: ROUTES
}

/**
 * If the user is authenticated, render the element, otherwise redirect to the home page
 */
function ProtectedRoute({ element, redirectTo }: ProtectedRouteProps) {
  const isAuth = useSelector(selectIsAuth)
  const location = useLocation()

  return isAuth ? element : <Navigate replace state={{ from: location }} to={redirectTo} />
}

export default ProtectedRoute

ProtectedRoute.defaultProps = {
  redirectTo: ROUTES.HOME,
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  redirectTo: PropTypes.string,
}
