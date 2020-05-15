// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Remove
export default function remove({ noteId }) {
  return axios.post(URL_API, {
    operation: 'noteRemove',
    params: { noteId },
  })
}
