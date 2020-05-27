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
import linkedin from 'setup/oauth/linkedin'
import reddit from 'setup/oauth/reddit'
import discord from 'setup/oauth/discord'
import zoom from 'setup/oauth/zoom'
import github from 'setup/oauth/github'
import gitlab from 'setup/oauth/gitlab'
import digitalocean from 'setup/oauth/digitalocean'
import bitbucket from 'setup/oauth/bitbucket'
import azure from 'setup/oauth/azure'
import spotify from 'setup/oauth/spotify'
import shopify from 'setup/oauth/shopify'

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

        <div className='group'>
          {/* social */}
          <section>
            <h4>Social:</h4>

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

            <a href={linkedin()}>
              <Button
                title='LinkedIn'
                image={`${URL_WEB}/images/social/linkedin.svg`}
              />
            </a>

            <a href={reddit()}>
              <Button
                title='Reddit'
                image={`${URL_WEB}/images/social/reddit.svg`}
              />
            </a>

            <a href={discord()}>
              <Button
                title='Discord'
                image={`${URL_WEB}/images/social/discord.svg`}
              />
            </a>

            <a href={zoom()}>
              <Button
                title='Zoom'
                image={`${URL_WEB}/images/social/zoom.svg`}
              />
            </a>
          </section>

          {/* tech */}
          <section>
            <h4>Tech:</h4>

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

            <a href={digitalocean()}>
              <Button
                title='DigitalOcean'
                image={`${URL_WEB}/images/tech/digitalocean.svg`}
              />
            </a>

            <a href={bitbucket()}>
              <Button
                title='Bitbucket'
                image={`${URL_WEB}/images/tech/bitbucket.svg`}
              />
            </a>

            <a href={azure()}>
              <Button
                title='Azure'
                image={`${URL_WEB}/images/tech/azure.svg`}
              />
            </a>
          </section>

          {/* other */}
          <section>
            <h4>Other:</h4>

            <a href={spotify()}>
              <Button
                title='Spotify'
                image={`${URL_WEB}/images/other/spotify.svg`}
              />
            </a>

            <a href={shopify()}>
              <Button
                title='Shopify'
                image={`${URL_WEB}/images/other/shopify.svg`}
              />
            </a>
          </section>
        </div>
      </section>

      {/* check user already logged in */}
      <AuthCheck />
    </>
  )
}

export default Home
