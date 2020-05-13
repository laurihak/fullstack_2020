import React, { useState, useEffect } from 'react'
import FilteredNames from './components/FilteredNames'
import personService from './services/persons'
import Notification from './components/Notification'




const App = () => {

    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
    const [message, setMessage] = useState()
    const [error, setError] = useState()

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber.toString()
        }
        let personToFind
        if (persons.length > 0) {
            personToFind = persons.find(person => person.name === newName)
        }
        
        if (personToFind !== undefined) {
            window.confirm(`${newName} is already in the phonebook, do you want to replace the old number with the new one?`)
            personService
            .updatePerson(personToFind.id, personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage(`${newName} number has been updated`)
                    setError(false)
                    hook()
                }).catch(error => {
                    setError(true)
                    setMessage(error.response.data.error)
                    //setMessage(error.response.data || `Information of ${newName} has already been removed from server`)
                })
        }
        else {
            personService
            .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`${newName} has been added`)
                    setError(false)
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    //setMessage(error.response.data || `error adding ${newName}` )
                    setError(true)
                })
        }
    }


    const hook = () => {
        console.log('effect')
        personService.getAll()
            .then(initialPersons => {
                console.log('promise fulfilled')
                setPersons(initialPersons)
            })

    }
    useEffect(hook, [])


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilteredNameChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handlePersonDelete = (name, id) => {
        if(window.confirm(`Are you sure to delete ${name} from phonebook?`)) {
        personService.deletePerson(id)
        setMessage(`${name} has been removed`)
        setError(true)

        } else {

        }
        hook()
    }


    return (
        <div>
            <Notification message={message} error={error} />
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
                <FilteredNames persons={persons} filter={filter} handlePersonDelete={handlePersonDelete} />
            </div>
            <br></br>
            <div>debug: {newName} {newNumber}</div>
        </div>
    )

}

export default App