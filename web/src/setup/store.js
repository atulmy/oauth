// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// App imports
import user from '../modules/user/api/state'

// Root Reducer
const rootReducer = combineReducers({
  ...user,
})

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk))
