import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const create = event => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    // props.displayNotification(`You created '${event.target.anecdote.value}'.`)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button action="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm