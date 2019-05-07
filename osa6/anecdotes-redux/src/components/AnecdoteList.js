import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

const AnecdoteList = props => {

  const vote = (id) => {
    props.voteAnecdote(id)
    const anecdote = props.anecdotes.find(a => a.id === id)
    props.displayNotification(`You voted '${anecdote.content}'.`)
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
      <Filter />
      {props.anecdotes
        .sort(byVotes)
        .filter(anecdote =>
          anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
        .map(anecdote => anecdotesToShow(anecdote)
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
