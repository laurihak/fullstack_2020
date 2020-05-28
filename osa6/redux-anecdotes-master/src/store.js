
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteService from './services/anecdotes'

import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer.js'

const reducer = combineReducers ({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store