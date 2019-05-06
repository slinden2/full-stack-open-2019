import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store, displayNotification }) => {
  const anecdotes = store.getState().anecdotes

  const vote = (id) => {
    store.dispatch(
      voteAnecdote(id)
    )

    const anecdote = anecdotes.find(a => a.id === id)
    displayNotification(`You voted '${anecdote.content}'.`)
  }

  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
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
  )
}

export default AnecdoteList