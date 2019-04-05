import React from 'react'
import Person from './Person'

const Persons = props => {
  return (
    <p>
      {props.shownPersons.map(
        person =>
          <Person
            key={person.id}
            person={person}
            persons={props.persons}
            updateList={props.updateList}
            notify={props.notify}
          />)}
    </p>
  )
}

export default Persons