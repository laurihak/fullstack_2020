
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'


const Authors = ({ show, setError }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [year, setYear] = useState('')
  const authorsData = useQuery(ALL_AUTHORS)
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
  if (authorsData.loading) {
    return <div>loading...</div>
  }

  const authors = authorsData.data.allAuthors
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
  setError: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}


export default Authors
