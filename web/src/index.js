// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StateProvider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// UI imports
import 'ui/common/colors.css'
import 'ui/common/reset.css'

// App imports
import { store } from 'setup/store'
import routes from 'setup/routes'
import Layout from 'modules/common/Layout'
import RoutePrivate from 'modules/common/RoutePrivate'
import {
  loginSetUserLocalStorage,
  loginSetUser,
} from 'modules/user/api/actions/query'
import * as serviceWorker from './serviceWorker'

// User Authentication
const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    loginSetUserLocalStorage(token, user)
    store.dispatch(loginSetUser(token, user))
  }
}

ReactDOM.render(
  <StateProvider store={store}>
    <Router>
      <Layout>
        <Switch>
          {Object.values(routes).map((route, index) =>
            route.auth ? (
              <RoutePrivate {...route} key={index} path={route.path} />
            ) : (
              <Route {...route} key={index} path={route.path} />
            ),
          )}
        </Switch>
      </Layout>
    </Router>
  </StateProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
