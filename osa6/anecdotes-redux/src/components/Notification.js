import React from 'react';
import { createNotification } from '../reducers/notificationReducer'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {store.getState().notification.message}
    </div>
  )
}

export default Notification
