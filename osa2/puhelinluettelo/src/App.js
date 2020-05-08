import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilteredNames from './components/FilteredNames'




const App = () => {

    const [persons, setPersons] = useState([
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target);

        const personObject = {
            name: newName,
            number: newNumber.toString()
        }
        if (persons.find(person => person.name === newName)) {
            window.alert(`${newName} is already on the phonebook!`)
        }
        else {
            setPersons(persons.concat(personObject))
            setNewName('')
        }
    }

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                console.log(response.data)
                
                setPersons(response.data)
            })
    }
    useEffect(hook,[])

    console.log('render', persons.length, 'persons')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleFilteredNameChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown numbers with<input value={filter} onChange={handleFilteredNameChange} />
            </div>
            <h2>Add new number</h2>
            <form onSubmit={addPerson} >
                <div> name: <input value={newName} onChange={handleNameChange} /></div>
                <div> number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                <FilteredNames persons={persons} filter={filter} />
            </div>
            <br></br>
            <div>debug: {newName} {newNumber}</div>
        </div>
    )

}

export default App