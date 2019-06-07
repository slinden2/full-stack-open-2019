import React from 'react'
import { useQuery } from 'react-apollo-hooks'

const Recommend = props => {
  const bookResult = useQuery(props.books)

  if (!props.show) {
    return null
  }

  if (bookResult.loading) {
    return <div>loading...</div>
  }
  
  const books = bookResult.data.allBooks
  console.log(books);

  return (
    <div>
      <h2>recommended books</h2>

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
            .filter(book => book.genres.includes(props.user.favoriteGenre))
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend