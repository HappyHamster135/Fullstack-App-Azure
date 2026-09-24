import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <p className="display-1 fw-bold text-body-secondary">404</p>
      <h1 className="h3">Sidan finns inte</h1>
      <p className="text-body-secondary">Adressen du försökte öppna finns inte.</p>
      <Button as={Link} to="/">Till startsidan</Button>
    </div>
  )
}

export default NotFoundPage
