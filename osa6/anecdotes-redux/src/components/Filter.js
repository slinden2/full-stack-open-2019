import React from 'react'
import { updateFilter } from '../reducers/filterReducer'

const Filter = React.forwardRef(({ store }, ref) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    store.dispatch(updateFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input ref={ref} onChange={handleChange} />
    </div>
  )
})

export default Filter