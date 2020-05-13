import React from 'react'
import Person from './Person'

const Names = ({ persons, handlePersonDelete }) => {
    const personsToReturn = persons.map((person, i) => {
        return (

            <div key={i}>
                <Person name={person.name} number={person.number} handlePersonDelete={() => handlePersonDelete(person.name, person.id)} />
            </div>
        )
    }
    )
    return (<div>{personsToReturn}</div>)
}

export default Names