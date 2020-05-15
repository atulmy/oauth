// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// App Imports
import routes from 'setup/routes'

// Component
const AuthCheck = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return isAuthenticated ? <Redirect to={routes.userDashboard.path} /> : ''
}

export default AuthCheck
