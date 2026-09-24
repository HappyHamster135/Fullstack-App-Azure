import { Card } from 'react-bootstrap'
import { useAuth } from '../auth/useAuth.js'

function DashboardPage() {
  const { user } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>
      <p className="lead">Inloggad som <strong>{user.email}</strong></p>

      <Card body className="text-body-secondary">
        Här kommer översikten över dina prenumerationer.
      </Card>
    </>
  )
}

export default DashboardPage
