import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const visibleWhenHidden = { display: visible ? 'none' : '' }
  const visibleWhenShown = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={visibleWhenHidden}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={visibleWhenShown}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Notification.propTypes = {
  ref: PropTypes.object.isRequired
}

export default Togglable