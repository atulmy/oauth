// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'

// Component
const Authorize = () => {
  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`Authorizing... · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <main className='pages-oauth'>
        <p>Authorizing...</p>
      </main>
    </>
  )
}

export default Authorize
