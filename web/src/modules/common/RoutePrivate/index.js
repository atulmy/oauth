// Imports
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// App imports
import routes from 'setup/routes'

// Component
const RoutePrivate = ({ role, component, ...props }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return isAuthenticated ? (
    <Route {...props} component={component} />
  ) : (
    <Redirect to={routes.pagesHome.path} />
  )
}

export default RoutePrivate
