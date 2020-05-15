// Imports
import React from 'react'

// UI imports
import './style.css'

// App imports
import params from 'setup/config/params'

// Component
const Footer = () => {
  // render
  return (
    <footer className='common-footer'>
      {params.site.copyright} {params.site.name} ·{' '}
      <a href={params.site.url} target='_blank' rel='noopener noreferrer'>
        GitHub
      </a>
    </footer>
  )
}

export default Footer
