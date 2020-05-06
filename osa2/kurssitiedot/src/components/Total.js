import React from 'react'

const Total = ({ parts }) => {
    
    const total = parts.reduce((sum, part) => {
        
    return (part.exercises + sum)
},0)

return <div>total of exercises {total}</div>
}


export default Total
