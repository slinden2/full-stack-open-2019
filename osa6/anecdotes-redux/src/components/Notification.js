import React from 'react';

const Notification = ({ store }) => {
  const notification = store.getState().notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.message ? '' : 'none'
  }

  return (
    <div style={style}>
      {store.getState().notification.message}
    </div>
  )
}

export default Notification
