/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const Books = ({
  show, setFilter, books, filteredBooks,
}) => {
  const handleFilter = (genre) => {
    setFilter(genre)
  }

  if (!show) {
    return null
  }
  if (filteredBooks.loading) {
    return <div>loading...</div>
  }
  const genres = books.map((a) => a.genres)
  const mergedGenres = [].concat(...genres)
  const uniqueGenres = [...new Set(mergedGenres)]

  return (
    <div>
      <h2>books</h2>

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
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((g) => (
        <button type="button" key={g} onClick={() => handleFilter(g)}>{g}</button>
      ))}
      <button type="button" key="all" onClick={() => setFilter('')}>all books</button>

    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  filteredBooks: PropTypes.array.isRequired,
}

export default Books
