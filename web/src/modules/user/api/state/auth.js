// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import { SET_USER, LOGOUT } from '../actions/types'

// Auth (user)

// Initial State

export const authInitialState = {
  isAuthenticated: false,
  user: null,
}

// State
export default (state = authInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      }

    case LOGOUT:
      return authInitialState

    default:
      return state
  }
}
