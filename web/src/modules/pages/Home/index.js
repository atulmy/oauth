// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI imports
import Button from 'ui/Button'
import './style.css'

// App imports
import params from 'setup/config/params'
import { URL_WEB } from 'setup/config/env'

// Component
const Home = () => {
  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`Home · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <main className='pages-home'>
        <p>Home</p>

        <div>
          <Button
            title='Facebook'
            image={`${URL_WEB}/images/social/facebook.svg`}
          />
        </div>
      </main>
    </>
  )
}

export default Home
