import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = props => {
  const [visible, setVisible] = useState(false)

  const { blog, notify, user } = props

  let showRemove = false
  if (user.username === blog.user.username
    || user.id === blog.user) {
    showRemove = true
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <div style={blogStyle} className='blogitem'>
      <div onClick={() => setVisible(!visible)} className='title'>
        {blog.title} {blog.author}
      </div>
      <div style={toggle(visible)} className='details'>
        {blog.url} <br />
        {blog.likes}
        <button onClick={() => props.likeBlog(blog)}>like</button> <br />
        added by {blog.user.name} <br />
        <button style={toggle(showRemove)} onClick={remove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
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