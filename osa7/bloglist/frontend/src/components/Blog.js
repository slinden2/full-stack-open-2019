import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = props => {
  const { blog, notify, user } = props
  if (blog === undefined) return null

  let showRemove = false
  if (user.username === blog.user.username
    || user.id === blog.user) {
    showRemove = true
  }

  const toggle = show => {
    return { display: show ? '' : 'none' }
  }

  const remove = async () => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      props.removeBlog(blog)
      notify(`${blog.title} removed successfully`, false)
    }
  }

  return (
    <div className='blogitem'>
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes}
        <button onClick={() => props.likeBlog(blog)}>like</button> <br />
        added by {blog.user.name} <br />
        <button style={toggle(showRemove)} onClick={remove}>remove</button>
      </div>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>{comment.text}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog