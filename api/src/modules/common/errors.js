// App Imports
import params from 'setup/config/params'

// Auth
class AuthError extends Error {
  constructor(message) {
    super(message)

    this.code = params.common.errors.auth
  }
}

// Validation
class ValidationError extends Error {
  constructor(message) {
    super(message)

    this.code = params.common.errors.validation
  }
}

export { AuthError, ValidationError }
