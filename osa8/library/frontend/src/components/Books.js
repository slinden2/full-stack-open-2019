import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const bookResult = useQuery(props.books)

  if (!props.show) {
    return null
  }

  if (bookResult.loading) {
    return <div>loading...</div>
  }

  const books = bookResult.data.allBooks

  const getGenres = () => {
    return [...new Set(books
      .map(book => book.genres)
      .flat())
    ]
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
          {books
            .filter(book => book.genres.includes(filter) || !filter)
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
        {getGenres().map(genre => 
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books