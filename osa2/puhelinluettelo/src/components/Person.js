import React from 'react'
import personService from '../services/persons'

const Person = props => {
  const { name, number, id } = props.person
  const updateList = props.updateList
  const persons = props.persons

  const removePerson = (id, name) => {
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          updateList(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <>
      <span key={id}>
        {name} {number} {" "}
        <button onClick={() => removePerson(id, name)}>
          poista
          </button>
      </span><br />
    </>
  )
}

export default Person