import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = props => {

  const userRow = user => {
    return (
      <tr key={user.id}>
        <td>
          <Link to={`${props.path}/${user.id}`}>{user.name}</Link>
        </td>
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

const ConnectedUsers = connect(mapStateToProps)(Users)

export default ConnectedUsers

