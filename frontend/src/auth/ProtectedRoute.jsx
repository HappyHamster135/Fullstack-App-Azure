import { Navigate, Outlet, useLocation } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from './useAuth.js'

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
