// Imports
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import * as queryString from 'query-string'

// UI imports
import './style.css'

// App imports
import { URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'
import routes from 'setup/routes'
import {
  loginSetUser,
  loginSetUserLocalStorage,
} from 'modules/user/api/actions/query'
import { authorize } from 'modules/user/api/actions/mutation'

// Component
const Authorize = ({ history, location }) => {
  // state
  const dispatch = useDispatch()

  // on load
  useEffect(() => {
    process()
  }, [])

  // process
  const process = async () => {
    const query = queryString.parse(location.search)

    if (query.code && query.state) {
      let redirectTo = routes.pagesHome.path

      try {
        const { data } = await authorize(query)

        if (data && data.success && data.data) {
          const token = data.data.token
          const user = data.data.user

          dispatch(loginSetUser(token, user))

          loginSetUserLocalStorage(token, user)

          redirectTo = routes.userDashboard.path
        }
      } catch (error) {
        // console.log(error)
      } finally {
        history.push(redirectTo)
      }
    } else {
      history.push(routes.pagesHome.path)
    }
  }

  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`Authorizing... · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <section className='pages-authorize'>
        <p>
          <img src={`${URL_WEB}/images/loader.gif`} alt='loading...' />{' '}
          Authorizing...
        </p>
      </section>
    </>
  )
}

export default Authorize
