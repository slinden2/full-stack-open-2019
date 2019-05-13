import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/userReducer'

const Users = props => {
  useEffect(() => {
    props.initUsers()
  }, [])

  const userRow = user => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1>users</h1>
      <table>
        <thead>
          <tr>
            <th>name</th><th># blogs</th>
          </tr>
        </thead>
        <tbody>
          {props.users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(user => userRow(user))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initUsers
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers

