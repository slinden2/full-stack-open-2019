import React from 'react'

const InputField = props => {
  return (
    <div>
      {props.text}: <input onChange={props.onChange} value={props.value} />
    </div>
  )
}

export default InputField