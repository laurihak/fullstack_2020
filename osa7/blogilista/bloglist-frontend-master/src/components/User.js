import React from 'react'
import { Link, } from 'react-router-dom'

export const User = ({ user }) => {
  console.log('user in user', user.id)
  const padding = {
    padding: 30
  }
  return (
    <tbody>
      <tr>
        <th><Link to={`/users/${user.id}`} style={padding}> {user.name} </Link></th>
        <th>{user.blogs.length}</th>
      </tr>
    </tbody>
  )
}

export const UserWithInfo = ({ user }) => {
  console.log('user should be called', user)
  if (!user)
    return (null)

  return (<div>
    <h1>{user.name}</h1>
    <h2>added blogs</h2>
    <div>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  </div>)
}
