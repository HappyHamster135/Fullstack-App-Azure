import { Form } from 'react-bootstrap'

function FormField({ label, name, type = 'text', value, error, hint, autoComplete, onChange }) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        isInvalid={Boolean(error)}
        onChange={onChange}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {hint && !error && <Form.Text muted>{hint}</Form.Text>}
    </Form.Group>
  )
}

export default FormField
