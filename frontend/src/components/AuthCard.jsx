import { Card, Col, Row } from 'react-bootstrap'

function AuthCard({ title, children }) {
  return (
    <Row className="justify-content-center">
      <Col sm={10} md={8} lg={5}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <h1 className="h3 mb-4">{title}</h1>
            {children}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AuthCard
