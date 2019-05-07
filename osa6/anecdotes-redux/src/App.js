import React, { useState } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { createNotification, hideNotification } from './reducers/notificationReducer'

const App = props => {
  const [timeoutId, setTimeoutId] = useState(0)

  const displayNotification = (message, error) => {
    clearTimeout(timeoutId)
    setTimeoutId(0)
    props.createNotification(message, error)
    setTimeoutId(setTimeout(() => {
      props.hideNotification()
    }, 5000))
  }

  return (
    <div>
      <Notification />
      <AnecdoteList
        displayNotification={displayNotification}
      />
      <AnecdoteForm
        displayNotification={displayNotification}
      />
    </div>
  )
}

const mapDispatchToProps = {
  createNotification,
  hideNotification
}

const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp
