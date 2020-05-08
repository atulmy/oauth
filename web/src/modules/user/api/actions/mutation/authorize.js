// Imports
import axios from 'axios'

// App imports
import { URL_API } from 'setup/config/env'

// Authorize
export default function authorize(query) {
  return axios.post(URL_API, {
    operation: 'userAuthorize',
    params: query,
  })
}
