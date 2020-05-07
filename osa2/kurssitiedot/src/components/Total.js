import React from 'react'

const Total = ({ parts }) => {
    
    const total = parts.reduce((sum, part) => {
        
    return (part.exercises + sum)
},0)

return <>total of exercises {total}</>
}


export default Total
