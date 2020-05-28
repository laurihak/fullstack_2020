import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  let newState = { ...state }

  switch (action.type) {
    case 'NEW_ANECDOTE':
      newState = [...state, action.data]
      return newState
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      newState = state.map(a =>
        a.id !== id ? a : votedAnecdote)
      return newState
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}
export const addVote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: { id },
    })
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content, 0)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}



export default anecdoteReducer