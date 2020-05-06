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
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <StateProvider store={store}>
    <Router>
      <Switch>
        {Object.values(routes).map((route, index) => (
          <Route {...route} key={index} path={route.path} />
        ))}
      </Switch>
    </Router>
  </StateProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
