import React from 'react'
import { connect } from 'react-redux'
import { Button, Divider, List } from 'semantic-ui-react'
import Comments from './Comments'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { initUsers } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = props => {
  const { blog } = props
  if (blog === undefined) return null

  const toggle = show => {
    return { display: show ? '' : 'none' }
  }

  const remove = () => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      props.removeBlog(blog)
      props.setNotification(`${blog.title} removed successfully`, false, 5)
    }
  }

  return (
    <div className='blogitem'>
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <List celled>
          <List.Item>
            <List.Header>
              URL
            </List.Header>
            <List.Content>
              <a href={blog.url}>{blog.url}</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Header>
              Likes
            </List.Header>
            <List.Content>
              <label>{blog.likes}</label>
              <Button compact onClick={() => props.likeBlog(blog)}>like</Button>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Header>
              Added by
            </List.Header>
            <List.Content>
              {blog.user.name}
            </List.Content>
          </List.Item>
          <Button compact style={toggle(props.showRemove())} onClick={remove}>remove</Button>
        </List>
        <Divider />
      </div>
      <Comments blog={blog} />
    </div>
  )
}

const showRemove = (state, ownProps) => {
  const user = state.auth
  const { blog } = ownProps
  return user.username === blog.user.username
    || user.id === blog.user
}

const mapStateToProps = (state, ownProps) => {
  return {
    showRemove: () => showRemove(state, ownProps)
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification,
  initUsers
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog