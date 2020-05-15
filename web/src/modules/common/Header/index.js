// Imports
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'
import routes from 'setup/routes'

// Component
const Header = () => {
  // state
  const { user } = useSelector((state) => state.auth)

  // render
  return (
    <header className='common-header'>
      <nav className='brand'>
        <h2>
          <Link to={routes.pagesHome.path}>{params.site.name}</Link>
        </h2>
        <h5>{params.site.description}</h5>
      </nav>

      <nav className='menu'>
        <NavLink
          to={user ? routes.userDashboard.path : routes.pagesHome.path}
          exact
        >
          Home
        </NavLink>

        {user && (
          <>
            <NavLink to={routes.noteList.path}>Notes</NavLink>
            <NavLink to={routes.userProfile.path}>Profile</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
