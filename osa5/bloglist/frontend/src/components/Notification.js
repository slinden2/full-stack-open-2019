import React from 'react'
import './Notification.css'

const Notification = ({ notification }) => {
  if (!notification) return ""
  
  const style = notification.error ? 'error' : 'success'

  return (
    <div className={style}>
      {notification.message}
    </div>
  )
}

export default Notification