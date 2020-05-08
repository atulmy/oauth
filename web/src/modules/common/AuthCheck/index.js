// Imports
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// App Imports
import params from 'setup/config/params'
import routes from 'setup/routes'

// Component
const AuthCheck = () => {
  const { isAuthenticated, details } = useSelector((state) => state.auth)

  return isAuthenticated ? <Redirect to={routes.userDashboard.path} /> : ''
}

export default AuthCheck
