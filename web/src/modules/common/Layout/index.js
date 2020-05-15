// Imports
import React from 'react'

// UI imports
import './style.css'

// App imports
import Header from 'modules/common/Header'
import Footer from 'modules/common/Footer'

// Component
const Layout = ({ children }) => {
  // render
  return (
    <div className='common-layout'>
      {/* header */}
      <Header />

      {/* content */}
      <main>{children}</main>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default Layout
