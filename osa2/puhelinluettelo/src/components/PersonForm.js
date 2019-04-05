import React from 'react'
import InputField from './InputField'

const PersonForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <InputField
          text="nimi"
          onChange={props.onNameChange}
          value={props.nameValue}
        />
        <InputField
          text="numero"
          onChange={props.onNumberChange}
          value={props.numberValue}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm