// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'

// Component
const Dashboard = () => {
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
      </section>
    </>
  )
}

export default Dashboard
