// Imports
import jwt from 'jsonwebtoken'

// App Imports
import { SECURITY_SECRET } from 'setup/config/env'

// Auth Response (token and user info)
export default function userAuthResponse(user) {
  user = user.toJSON()

  delete user.password

  return {
    token: jwt.sign({ id: user._id }, SECURITY_SECRET),
    user,
  }
}
