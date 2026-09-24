import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../auth/useAuth.js'
import AuthCard from '../components/AuthCard.jsx'
import FormField from '../components/FormField.jsx'
import { useForm } from '../hooks/useForm.js'
import { validateLogin } from '../utils/validation.js'

const INITIAL_VALUES = { email: '', password: '' }

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const { values, errors, serverError, isSubmitting, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateLogin,
    async (credentials) => {
      await login(credentials)
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
    },
  )

  return (
    <AuthCard title="Logga in">
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
          autoComplete="current-password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-100 mt-2" disabled={isSubmitting}>
          {isSubmitting ? 'Loggar in…' : 'Logga in'}
        </Button>
      </Form>

      <p className="mt-3 mb-0 text-center">
        Inget konto? <Link to="/register">Skapa ett här</Link>
      </p>
    </AuthCard>
  )
}

export default LoginPage
