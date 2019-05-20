import React, { useState } from 'react'

const EditAuthor = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

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

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          <label>name</label>
          <input 
            type="text"
            value={name}
            onChange={({ target: { value } }) => setName(value)} />
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