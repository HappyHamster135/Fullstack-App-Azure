import { Button } from 'react-bootstrap'
import { Link } from 'react-router'
import { useAuth } from '../auth/useAuth.js'
import ApiStatus from '../components/ApiStatus.jsx'

function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <h1>Välkommen till SubTracker</h1>
      <p className="lead">Samla dina prenumerationer och se vad de kostar per månad.</p>

      <div className="d-flex flex-wrap gap-2 mb-4">
        {isAuthenticated ? (
          <Button as={Link} to="/dashboard">Till dashboard</Button>
        ) : (
          <>
            <Button as={Link} to="/register">Kom igång</Button>
            <Button as={Link} to="/login" variant="outline-secondary">Logga in</Button>
          </>
        )}
      </div>

      <ApiStatus />
    </>
  )
}

export default HomePage
