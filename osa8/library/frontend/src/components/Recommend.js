import React, { useState, useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'

const Recommend = props => {
  const [user, setUser] = useState(null)
  const [booksToShow, setBooksToShow] = useState([])
  
  const client = useApolloClient()

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: props.LOGGED_USER,
        fetchPolicy: 'no-cache'
      })
      setUser(data.me)
    })()
  }, [props.show])

  const getRecommendations = async () => {
    const { data } = await client.query({ 
      query: props.ALL_BOOKS,
      variables: { genre: user.favoriteGenre },
      fetchPolicy: 'no-cache'
    })
    setBooksToShow(data.allBooks)
  }

  useEffect(() => {
    if (user) {
      getRecommendations()
    }  
  }, [props.show])

  if (!props.show) {
    return null
  }

  if (!booksToShow) {
    return <div>loading...</div>
  }
  
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
    </div>
  )
}

export default Recommend