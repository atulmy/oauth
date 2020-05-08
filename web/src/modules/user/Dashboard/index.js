// Imports
import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'
import { logout } from 'modules/user/api/actions/query'
import Button from 'ui/Button'

// Component
const Dashboard = () => {
  const dispatch = useDispatch()

  // on logout
  const onLogout = () => {
    let check = window.confirm('Are you sure you want to logout?')

    if (check) {
      dispatch(logout())
    }
  }

  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`User Dashboard · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <section className='user-dashboard'>
        <p>Welcome USER!</p>

        <aside>
          <Button title='Logout' onClick={onLogout} />
        </aside>
      </section>
    </>
  )
}

export default Dashboard
