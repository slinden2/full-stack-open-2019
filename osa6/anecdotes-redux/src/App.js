import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = props => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp
