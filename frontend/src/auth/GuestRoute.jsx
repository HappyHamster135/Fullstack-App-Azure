import { Navigate, Outlet } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useAuth } from './useAuth.js'

function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default GuestRoute
