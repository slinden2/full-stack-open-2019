import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { initUsers } from '../reducers/userReducer'

const Users = props => {

  const userRow = user => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell>
          <Link to={`${props.path}/${user.id}`}>{user.name}</Link>
        </Table.Cell>
        <Table.Cell>{user.blogs.length}</Table.Cell>
      </Table.Row>
    )
  }

  return (
    <div>
      <h1>users</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell># blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map(user => userRow(user))}
        </Table.Body>
      </Table>
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

