import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

const LOGGED_USER = gql`
  {
    me {
      username
      favoriteGenre
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null)
  const loggedUserResult = useQuery(LOGGED_USER)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: LOGGED_USER
      })
      console.log("useEffectin user", data.me);
      setLoggedUser(data.me)
    })()
  }, [token])

  const addBook = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ]
  })

  const editAuthor = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const login = useMutation(LOGIN)

  const logout = () => {
    console.log("logataan ulos");
    setToken(null)
    console.log("token nullattu");
    localStorage.removeItem('library-user-token')
    console.log("localStorage tyhjennetty");
    client.resetStore()
    console.log("välimuisti resetoitu");
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
        ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        : <>
            <button onClick={() => setPage('login')}>login</button>
          </>}
      </div>

      <Authors
        show={page === 'authors'}
        result={authorResult}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        bookResult={bookResult}
        token={token}
        loggedUserResult={loggedUserResult}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        setPage={setPage}
      />

    </div>
  )
}

export default App
