// Imports
import axios from 'axios'

// App Imports
import { LOGOUT } from 'modules/user/api/actions/types'
import { logoutUnsetUserLocalStorage } from 'modules/user/api/actions/query'

// Log out user and remove token from localStorage
export default function logout() {
  return (dispatch) => {
    logoutUnsetUserLocalStorage()

    delete axios.defaults.headers.common['Authorization']

    dispatch({
      type: LOGOUT,
    })

    dispatch({
      type: 'RESET',
    })

    // Clear cache
    for (let key in localStorage) {
      if (key.indexOf('CACHE.KEY/') !== -1) {
        window.localStorage.removeItem(key)
      }
    }
  }
}
