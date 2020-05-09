// Imports
import React from 'react'
import { Helmet } from 'react-helmet'

// UI imports
import Button from 'ui/Button'
import './style.css'

// App imports
import { URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'
import AuthCheck from 'modules/common/AuthCheck'
import facebook from 'setup/oauth/facebook'
import google from 'setup/oauth/google'
import instagram from 'setup/oauth/instagram'
import github from 'setup/oauth/github'
import gitlab from 'setup/oauth/gitlab'

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
        <p>Welcome guest! Sign in with:</p>

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

          <a href={github()}>
            <Button
              title='GitHub'
              image={`${URL_WEB}/images/tech/github.svg`}
            />
          </a>

          <a href={gitlab()}>
            <Button
              title='GitLab'
              image={`${URL_WEB}/images/tech/gitlab.svg`}
            />
          </a>

          <a href={instagram()}>
            <Button
              title='DigitalOcean'
              image={`${URL_WEB}/images/tech/digitalocean.svg`}
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
