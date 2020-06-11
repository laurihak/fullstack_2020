
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, setError, authors }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0].message)
      }
      setError(null)
    },
  })

  if (!show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }


  const submit = async (event) => {
    event.preventDefault()
    const yearNumber = parseInt(year, 10)
    editAuthor({ variables: { name: selectedOption.name, setBornTo: yearNumber } })
    setYear('')
  }

  const handleChange = (event) => {
    setSelectedOption(event)
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthdayyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            Author
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={authors}
              getOptionLabel={(author) => author.name}
              getOptionValue={(author) => author}
            />
          </div>
          <div>
            born
            <input
              type="Number"
              id="birthday"
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

Authors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  authors: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}


export default Authors
