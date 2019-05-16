import { useState } from 'react'

export const useField = name => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const excludeReset = () => {
    return ({
      type: 'text',
      name,
      value,
      onChange
    })
  }

  return [{
    type: 'text',
    name,
    value,
    onChange,
  }, reset]
}
