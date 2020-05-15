// Imports
import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'

// Component
const Dashboard = () => {
  // state
  const { user } = useSelector((state) => state.auth)

  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`User Dashboard · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <section className='user-dashboard'>
        <p>Welcome, {user && user.name}!</p>
      </section>
    </>
  )
}

export default Dashboard
