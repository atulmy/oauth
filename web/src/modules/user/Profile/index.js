// Imports
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import moment from 'moment'

// UI imports
import Button from 'ui/Button'
import './style.css'

// App imports
import params from 'setup/config/params'
import { logout, profile } from 'modules/user/api/actions/query'

// Component
const Dashboard = () => {
  // state
  const [isLoading, isLoadingToggle] = useState(false)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // on load
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = async () => {
    isLoadingToggle(true)

    try {
      const { data } = await profile()

      if (data.success && data.data) {
        setUser(data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingToggle(false)
    }
  }

  // on logout
  const onLogout = () => {
    let check = window.confirm('Are you sure you want to logout?')

    if (check) {
      dispatch(logout())
    }
  }

  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`User Dashboard · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <section className='user-dashboard'>
        {isLoading ? (
          <p>Loading profile...</p>
        ) : (
          user && (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Registered:</strong>{' '}
                {moment(user.createdAt).format(params.common.date)}
              </p>
            </>
          )
        )}

        <aside>
          <Button title='Logout' onClick={onLogout} />
        </aside>
      </section>
    </>
  )
}

export default Dashboard
