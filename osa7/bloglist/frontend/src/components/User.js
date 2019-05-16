import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const User = props => {
  if (props.user === undefined) return null

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <List>
        {props.user.blogs.map(blog =>
          <List.Item key={blog.id}>{blog.title} by {blog.author}</List.Item>)}
      </List>
    </div>
  )
}

const ConnectedUser = connect()(User)

export default ConnectedUser



