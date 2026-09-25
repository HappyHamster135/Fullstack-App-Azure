import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/useAuth.js";
import UserMenu from "./UserMenu.jsx";

function Layout() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar key={pathname} expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SubTracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Hem
              </Nav.Link>
              {isAuthenticated && (
                <>
                  <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/subscriptions">
                    Prenumerationer
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/categories">
                    Kategorier
                  </Nav.Link>
                </>
              )}
            </Nav>
            <UserMenu />
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
  );
}

export default Layout;
