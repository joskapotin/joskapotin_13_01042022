import { useLocation, Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import ROUTES from "./constants/routes"
import useAppSelector from "./hooks/useAppSelector"
import { selectIsAuth } from "./utils/selectors"

export type ProtectedRouteProps = {
  element: JSX.Element
  redirectTo: ROUTES
}

/**
 * If the user is authenticated, render the element, otherwise redirect to the home page
 */
function ProtectedRoute({ element, redirectTo }: ProtectedRouteProps) {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  return isAuth ? element : <Navigate replace state={{ from: location }} to={redirectTo} />
}

export default ProtectedRoute

ProtectedRoute.defaultProps = {
  redirectTo: ROUTES.HOME,
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
}
