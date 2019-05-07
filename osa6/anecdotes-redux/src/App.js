import React, { useState } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { createNotification, hideNotification } from './reducers/notificationReducer'

const App = ({ store }) => {
  const [timeoutId, setTimeoutId] = useState(0)

  const displayNotification = (message, error) => {
    clearTimeout(timeoutId)
    setTimeoutId(0)
    store.dispatch(createNotification(message, error))
    setTimeoutId(setTimeout(() => {
      store.dispatch(hideNotification())
    }, 5000))
  }

  return (
    <div>
      {/* <Notification store={store} /> */}
      <AnecdoteList
        displayNotification={displayNotification}
      />
      {/* <AnecdoteForm
        store={store}
        displayNotification={displayNotification}
      /> */}
    </div>
  )
}

export default App
