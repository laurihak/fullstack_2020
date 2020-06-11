import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, GET_ME } from '../queries'

const RecommendedBooks = ({ show }) => {
  const [filter, setFilter] = useState('')
  const [books, setBooks] = useState([])
  const client = useApolloClient()

  const fetchUser = async () => {
    const user = await client.query({ query: GET_ME })
    if (user.data.me) {
      setFilter(user.data.me.favoritegenres.toString())
    }
  }
  const fetchBooks = async () => {
    const responseBooks = await client.query({ query: ALL_BOOKS })
    if (responseBooks.data.allBooks) {
      setBooks(responseBooks.data.allBooks)
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line
  }, [show])

  useEffect(() => {
    fetchBooks()
  }, [filter]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <h3>
        Books in your favourite genre:
        {filter}
      </h3>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter((b) => b.genres.toString().includes(filter)).map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

RecommendedBooks.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default RecommendedBooks
