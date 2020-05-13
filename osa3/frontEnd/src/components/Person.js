import React from 'react'
import Button from './Button'

const Person = ({ name, number, handlePersonDelete, id }) => {

    return (
        <div>
            {name} {number} <Button handlePersonDelete={() => handlePersonDelete(name, id)} />
        </div>
    )
}

export default Person