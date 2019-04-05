import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownPersons, setShownPersons] = useState(persons)

  const updateList = persons => {
    setPersons(persons)
    setShownPersons(persons)
    setFilter("")
  }

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        updateList(persons)
      })
  }

  useEffect(hook, [])

  const containsObject = (array, objA) => {
    for (const objB of array) {
      if (objB.name === objA.name) return objB.id
    }
    return false
  }

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingId = containsObject(persons, newPerson)

    if (existingId) {
      if (window.confirm(`${newPerson.name} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        personService
          .update(existingId, newPerson)
          .then(modifiedPerson => {
            const newPersons = persons.map(
              person =>
                person.name === modifiedPerson.name
                  ? modifiedPerson
                  : person
            )
            updateList(newPersons)
          })
      }
    } else {
      personService
        .add(newPerson)
        .then(addedPerson => {
          updateList(persons.concat(addedPerson))
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = ({ target: { value } }) => setNewName(value)
  const handleNumberChange = ({ target: { value } }) => setNewNumber(value)

  const handleFilterChange = ({ target: { value } }) => {
    setFilter(value)

    if (!value) {
      setShownPersons(persons)
    } else {
      setShownPersons(
        persons.filter(person =>
          person.name.toLowerCase().startsWith(value.toLowerCase()))
      )
    }
  }

  return (
    <>
      <h1>Puhelinluettelo</h1>
      <InputField
        text="rajaa näytettäviä"
        onChange={handleFilterChange}
        value={filter}
      />
      <h2>Lisää uusi</h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} shownPersons={shownPersons} updateList={updateList} />
    </>
  )

}

export default App