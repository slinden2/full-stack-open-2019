import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [booksToShow, setBooksToShow] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: props.ALL_GENRES,
      })
      setGenres(data.allGenres)
    })()
  }, [props.show])

  useEffect(() => {
    (async () => {
      const { data } = await client.query({ 
        query: props.ALL_BOOKS,
        variables: { genre: filter },
      })
      setBooksToShow(data.allBooks)
    })()
  }, [filter, props.show])

  if (!props.show) {
    return null
  }

  if (!booksToShow) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {filter && <div>in genre {filter}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => 
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books