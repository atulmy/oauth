// Imports
import axios from 'axios'

// App imports
import { URL_API } from 'setup/config/env'

// Profile
export default function profile() {
  return axios.post(URL_API, {
    operation: 'userProfile',
  })
}
