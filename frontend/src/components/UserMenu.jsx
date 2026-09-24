import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../auth/useAuth.js'

function UserMenu() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <Nav className="align-items-md-center gap-2">
        <Nav.Link as={NavLink} to="/login">Logga in</Nav.Link>
        <Button as={Link} to="/register" size="sm" className="align-self-start align-self-md-center">
          Skapa konto
        </Button>
      </Nav>
    )
  }

  return (
    <Nav className="align-items-md-center gap-2">
      <Navbar.Text className="text-truncate">{user.email}</Navbar.Text>
      <Button variant="outline-light" size="sm" className="align-self-start align-self-md-center" onClick={handleLogout}>
        Logga ut
      </Button>
    </Nav>
  )
}

export default UserMenu
