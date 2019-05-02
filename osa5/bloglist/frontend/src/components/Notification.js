import React from 'react'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ notification }) => {
  if (!notification) return ''

  const style = notification.error ? 'error' : 'success'

  return (
    <div className={style}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification