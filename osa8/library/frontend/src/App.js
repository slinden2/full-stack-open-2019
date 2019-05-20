import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorResult}
      />

      <Books
        show={page === 'books'}
        result={bookResult}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
