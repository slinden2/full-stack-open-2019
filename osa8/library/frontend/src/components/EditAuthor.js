import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleNameChange = ({ label }) => {
    setName(label)
  }

  const updateAuthor = async e => {
    e.preventDefault()

    await props.editAuthor({
      variables: {
        name,
        born: parseInt(born)
      }
    })

    setName('')
    setBorn('')
  }

  const options = props.authors.map(a => ({
    label: a.name,
    value: a.name,
  }))

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <Select
            options={options}
            onChange={handleNameChange}
            placeholder="select author..."
            
          />
        </div>
        <div>
          <label>born</label>
          <input
            type="text"
            value={born}
            onChange={({ target: { value } }) => setBorn(value)} />
        </div>
        <button action="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor