import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = props => {
  if (!props.notification.message) return null

  const style = props.notification.error ? 'error' : 'success'

  return (
    <Message className="style">
      {props.notification.message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification