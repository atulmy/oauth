// App Imports
import { ENV } from 'setup/config/env'

// Utility functions

// Check development env
export function isDevelopment() {
  return ENV === 'development'
}

// Generate random number
export function randomNumber(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

// Auth check user
export function authCheck(auth) {
  return auth && auth.user && auth.user._id
}
