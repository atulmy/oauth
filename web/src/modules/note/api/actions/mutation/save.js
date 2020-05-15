// Imports
import axios from 'axios'

// App Imports
import { URL_API } from 'setup/config/env'

// Save
export default function save(note) {
  return axios.post(URL_API, {
    operation: 'noteSave',
    params: note,
  })
}
