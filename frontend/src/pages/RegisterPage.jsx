import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/useAuth.js'
import AuthCard from '../components/AuthCard.jsx'
import FormField from '../components/FormField.jsx'
import { useForm } from '../hooks/useForm.js'
import { validateRegister } from '../utils/validation.js'

const INITIAL_VALUES = { email: '', password: '', confirmPassword: '' }

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const { values, errors, serverError, isSubmitting, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateRegister,
    async ({ email, password }) => {
      await register({ email, password })
      navigate('/dashboard', { replace: true })
    },
  )

  return (
    <AuthCard title="Skapa konto">
      {serverError && <Alert variant="danger">{serverError}</Alert>}

      <Form noValidate onSubmit={handleSubmit}>
        <FormField
          label="E-post"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />

        <FormField
          label="Lösenord"
          name="password"
          type="password"
          autoComplete="new-password"
          hint="Minst 8 tecken med stor och liten bokstav samt en siffra."
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />

        <FormField
          label="Bekräfta lösenord"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit" className="w-100 mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Skapar konto…' : 'Skapa konto'}
        </Button>
      </Form>

      <p className="mt-3 mb-0 text-center">
        Har du redan ett konto? <Link to="/login">Logga in</Link>
      </p>
    </AuthCard>
  )
}

export default RegisterPage
