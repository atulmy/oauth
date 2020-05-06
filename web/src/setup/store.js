// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// App Imports

// Root Reducer
const rootReducer = combineReducers({})

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk))
