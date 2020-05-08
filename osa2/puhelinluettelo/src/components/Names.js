import React from 'react'
import Person from './Person'

const Names = (props) => {
    const persons = props.persons.map((person) => {
        return (
            <div key={person.name}>
                <Person name={person.name} number={person.number} />
            </div>
        )
    }
    )
    return (<div>{persons}</div>)
}

export default Names