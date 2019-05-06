import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = ({ store, displayNotification }) => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter

  const vote = (id) => {
    store.dispatch(
      voteAnecdote(id)
    )

    const anecdote = anecdotes.find(a => a.id === id)
    displayNotification(`You voted '${anecdote.content}'.`)
  }

  const byVotes = (a, b) => b.votes - a.votes

  const anecdotesToShow = anecdote => (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={store} />
      {anecdotes
        .sort(byVotes)
        .filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote => anecdotesToShow(anecdote)
      )}
    </div>
  )
}

export default AnecdoteList