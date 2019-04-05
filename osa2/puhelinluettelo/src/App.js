import React, { useState, useEffect } from 'react'
import InputField from './components/InputField'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownPersons, setShownPersons] = useState(persons)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)
  const [timeoutId, setTimeoutId] = useState(0)

  // Haetaan tiedot palvelimelta ja päivitetään persons-taulukko
  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        updateList(persons)
      })
  }
  useEffect(hook, [])

  // Apufunktio hookkien päivittämiseen
  const updateList = persons => {
    setPersons(persons)
    setShownPersons(persons)
    setFilter("")
  }

  // Nimien vertailufunktio. Palauttaa taulukosta löytyneen
  // kontaktin id:n. Tätä tarvitaan kontakin päivittämiseen.
  const containsObject = (array, objA) => {
    for (const objB of array) {
      if (objB.name === objA.name) return objB.id
    }
    return false
  }

  // Funktio notifikaatioiden hallintaan.
  // Jos toiminta päätyy virheeseen, niin 
  // error-hookin avulla saadaan erilainen 
  // notifikaatioväritys.
  const notify = (message, error) => {
    clearTimeout(timeoutId)
    if (error) {
      setError(true)
    } else {
      setError(false)
    }

    setNotification(message)
    setTimeoutId(setTimeout(() => {
      setError(false)
      setNotification(null)
    }, 5000))
  }

  // Funktio henkilöiden lisämiseen. Jos henkilö
  // on jo olemassa, niin kutsutaan updatePerson-funktiota
  const addPerson = event => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingId = containsObject(persons, newPerson)
    if (existingId) {
      if (window.confirm(`${newPerson.name} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        updatePerson(existingId, newPerson)
      }
    } else {
      personService
        .add(newPerson)
        .then(addedPerson => {
          updateList(persons.concat(addedPerson))
          notify(`Lisättiin ${addedPerson.name}`)
        })
    }
    setNewName("")
    setNewNumber("")
  }

  // Funktio henkilön päivittämiseen
  const updatePerson = (existingId, newPerson) => {
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
        notify(`Henkilön ${newPerson.name} numeroa muutettiin`)
      })
      .catch(error => {
        notify(`Henkilö ${newPerson.name} oli jo poistettu`, error)
        updateList(persons.filter(person => person.id !== existingId))
      })
  }

  // Apufuktiot kenttien tietojen tallentamiseen
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
      <Notification
        message={notification}
        error={error}
      />
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
      <Persons
        persons={persons}
        shownPersons={shownPersons}
        updateList={updateList}
        notify={notify}
      />
    </>
  )

}

export default App