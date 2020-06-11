import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'


const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      if (error.graphQLErrors[0]) {
        window.alert(error.graphQLErrors[0].message) // eslint-disable-line no-alert
      }
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])// eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
    setUsername('')
    setPassword('')
  }

  const margin = {
    marginTop: 10,
  }

  return (
    <div style={margin}>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">
          login
        </button>
      </form>
    </div>
  )
}

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default Login
