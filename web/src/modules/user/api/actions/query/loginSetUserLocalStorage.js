// Imports
import axios from 'axios'

// Set user token and info in localStorage and axios auth headers
export default function loginSetUserLocalStorage(token, user) {
  if (token) {
    axios.defaults.headers.common['Authentication'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authentication']
  }

  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))
}
