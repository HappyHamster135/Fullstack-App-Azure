const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PASSWORD_RULES = [
  { test: (password) => password.length >= 8, message: 'Lösenordet måste vara minst 8 tecken.' },
  { test: (password) => /\d/.test(password), message: 'Lösenordet måste innehålla minst en siffra.' },
  { test: (password) => /\p{Ll}/u.test(password), message: 'Lösenordet måste innehålla minst en liten bokstav.' },
  { test: (password) => /\p{Lu}/u.test(password), message: 'Lösenordet måste innehålla minst en stor bokstav.' },
]


//---------------
//-----Login
//---------------

export function validateLogin({ email, password }) {
  const errors = {}

  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError

  if (!password) errors.password = 'Ange ditt lösenord.'

  return errors
}


//---------------
//-----Register
//---------------

export function validateRegister({ email, password, confirmPassword }) {
  const errors = {}

  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError

  const failedRule = PASSWORD_RULES.find((rule) => !rule.test(password))
  if (failedRule) errors.password = failedRule.message

  if (confirmPassword !== password) errors.confirmPassword = 'Lösenorden matchar inte.'

  return errors
}


//---------------
//-----Helpers
//---------------

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

function validateEmail(email) {
  if (!email.trim()) return 'Ange din e-postadress.'
  if (!EMAIL_PATTERN.test(email)) return 'Ange en giltig e-postadress.'
  return null
}
