import React from 'react'

const Notification = (props) => {
  // console.log(props)

  if (props.message === null) return null

  const notificationType = props.error ? "error" : "success"

  return (
    <div className={`notification ${notificationType}`}>
      {props.message}
      <br />
    </div>
  )
}

export default Notification