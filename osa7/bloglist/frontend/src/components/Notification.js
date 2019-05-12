import React from 'react'
import { connect } from 'react-redux'
import './Notification.css'

const Notification = props => {
  if (!props.notification) return null

  const style = props.notification.error ? 'error' : 'success'

  return (
    <div className={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification