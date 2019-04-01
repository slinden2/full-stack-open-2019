import React, { useState } from 'react'

const Person = ({ person: { name, number } }) => <li>{name} {number}</li>

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const PersonForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <InputField text="nimi" onChange={props.onNameChange} value={props.nameValue} />
        <InputField text="numero" onChange={props.onNumberChange} value={props.numberValue} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const InputField = (props) => {
  return (
    <div>
      {props.text}: <input onChange={props.onChange} value={props.value} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Martti Tienari', number: '040-1234567' },
    { name: 'Arto Järvinen', number: '040-1234567' },
    { name: 'Lea Kutvonen', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const constainsObject = (array, objA) => {
    for (const objB of array) {
      if (objB.name === objA.name) return true
    }
    return false
  }

  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (constainsObject(persons, newPerson)) {
      alert(`${newPerson.name} on jo luettelossa`)
    } else {
      setPersons(persons.concat(newPerson))
      setFilteredPersons(persons.concat(newPerson))
      setFilter("")
    }

    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = ({ target: { value } }) => setNewName(value)
  const handleNumberChange = ({ target: { value } }) => setNewNumber(value)

  const handleFilterChange = ({ target: { value } }) => {
    setFilter(value)
    if (!value) {
      setFilteredPersons(persons)
    } else {
      setFilteredPersons(
        persons.filter(person =>
          person.name.toLowerCase().startsWith(value.toLowerCase()))
      )
    }
  }

  return (
    <>
      <h1>Puhelinluettelo</h1>
      <InputField text="rajaa näytettäviä" onChange={handleFilterChange} value={filter} />
      <h2>Lisää uusi</h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber}
      />
      <h2>Numerot</h2>
      <Persons persons={filteredPersons} />
    </>
  )

}

export default App