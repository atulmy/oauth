// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'
import routes from 'setup/routes'

// Component
const Layout = ({ children }) => {
  // render
  return (
    <div className='common-layout'>
      {/* header */}
      <header>
        <h2>
          <Link to={routes.pagesHome.path}>{params.site.name}</Link>
        </h2>
        <h5>{params.site.description}</h5>
      </header>

      {/* content */}
      <main>{children}</main>

      {/* footer */}
      <footer>
        {params.site.copyright} {params.site.name} ·{' '}
        <a href={params.site.url} target='_blank'>
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default Layout
