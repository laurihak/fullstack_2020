import React, { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, BOOKS_BYGENRE } from './graphql/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Login from './components/Login'
import Recommended from './components/RecommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [filter, setFilter] = useState('')
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set
      .map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  const fetchBooks = async () => {
    const allBooks = await client.query({ query: ALL_BOOKS })
    setBooks(allBooks.data.allBooks)
  }

  const fetchFilteredBooks = async () => {
    if (filter.length > 0) {
      const booksByGenre = await client
        .query({ variables: { genre: filter }, query: BOOKS_BYGENRE })
      setFilteredBooks(booksByGenre.data.allBooks)
    } else {
      const booksByGenre = await client.query({ query: ALL_BOOKS })
      setFilteredBooks(booksByGenre.data.allBooks)
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} was just added`) // eslint-disable-line no-alert
      updateCacheWith(subscriptionData.data.bookAdded)
    },
    onSubscriptionComplete: () => {
    },
  })

  useEffect(() => {
    fetchBooks()
  }, [updateCacheWith]) // eslint-disable-line
  useEffect(() => {
    fetchFilteredBooks()
  }, [updateCacheWith]) // eslint-disable-line

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')
    if (userToken) setToken(userToken)
  }, [token])

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        {token
          ? (
            <>
              <button type="button" onClick={() => setPage('add')}>add book</button>
              <button type="button" onClick={() => setPage('recommended')}>recommended</button>
              <button type="button" onClick={logOut}>log out</button>
            </>
          )
          : <button type="button" onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        setPage={setPage}
      />
      <Books
        books={books}
        show={page === 'books'}
        setFilter={setFilter}
        filteredBooks={filteredBooks}
      />
      <BookForm
        show={page === 'add'}
      />
      <Login
        setToken={setToken}
        show={page === 'login'}
        setPage={setPage}
      />
      <Recommended
        books={books}
        show={page === 'recommended'}
      />
    </div>
  )
}

export default App
