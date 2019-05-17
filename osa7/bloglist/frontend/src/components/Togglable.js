import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

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
        <Button primary onClick={toggleVisibility} data-cy={props.cy}>{props.buttonLabel}</Button>
      </div>
      <div style={visibleWhenShown}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable