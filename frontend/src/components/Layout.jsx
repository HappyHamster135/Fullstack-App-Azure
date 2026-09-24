import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Outlet } from 'react-router'

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">SubTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>Hem</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="flex-grow-1 py-4">
        <Outlet />
      </Container>

      <footer className="border-top py-3 text-center text-body-secondary small">
        SubTracker – koll på dina prenumerationer
      </footer>
    </div>
  )
}

export default Layout
