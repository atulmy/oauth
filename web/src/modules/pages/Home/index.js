// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI imports
import Button from 'ui/Button'
import './style.css'

// App imports
import { URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'
import { facebook, google, instagram } from 'setup/oauth/url'
import AuthCheck from 'modules/common/AuthCheck'

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
      <section className='pages-home'>
        <p>Welcome! Sign in with:</p>

        <div className='cta'>
          <a href={facebook()}>
            <Button
              title='Facebook'
              image={`${URL_WEB}/images/social/facebook.svg`}
            />
          </a>

          <a href={google()}>
            <Button
              title='Google'
              image={`${URL_WEB}/images/social/google.svg`}
            />
          </a>

          <a href={instagram()}>
            <Button
              title='Instagram'
              image={`${URL_WEB}/images/social/instagram.svg`}
            />
          </a>
        </div>
      </section>

      {/* check user already logged in */}
      <AuthCheck />
    </>
  )
}

export default Home
