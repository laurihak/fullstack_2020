import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotelist = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const filteredAnecdotes = anecdotes.filter(a => a.content.includes(filter))
  console.log('anecdootit listassa', anecdotes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    let votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted ${votedAnecdote.content}`, 5))
  }

  return (
    <div>
      {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )}

  export default Anecdotelist