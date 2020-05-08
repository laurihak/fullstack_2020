import React from 'react'
import Names from './Names'
import Person from './Person'

const FilteredNames = (props) => {

    if (props.filter.length > 0) {
        const filtered = props.persons.filter(obj => obj.name.toLowerCase().includes(props.filter)).map(person => {
            return (
                <div key={person.name}>
                    <Person name={person.name} number={person.number} />
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
                <Names persons={props.persons} />
            </div>
        )
    }
}

export default FilteredNames