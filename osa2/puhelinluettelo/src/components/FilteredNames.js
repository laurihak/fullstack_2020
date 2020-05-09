import React from 'react'
import Names from './Names'
import Person from './Person'

const FilteredNames = ({ persons, filter, handlePersonDelete }) => {

    if (filter.length > 0) {
        const filtered = persons.filter(obj => obj.name.toLowerCase().includes(filter)).map((person, i) => {
            return (
                <div key={i}>
                    <Person name={person.name} number={person.number} handlePersonDelete={() => handlePersonDelete(person.name, person.id)} />
                </div>
            )
        })
        return (
            <div>
                {filtered}
            </div>
        )
    }
    else {

        return (
            <div>
                <Names persons={persons} handlePersonDelete={handlePersonDelete} />
            </div>
        )
    }
}

export default FilteredNames