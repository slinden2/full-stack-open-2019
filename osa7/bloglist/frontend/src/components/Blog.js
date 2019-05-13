import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlogDispatch, notify, removeBlogDispatch, user }) => {
  const [visible, setVisible] = useState(false)

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

  const creator = blog.user.name ? blog.user.name : user.name

  const toggle = show => {
    return { display: show ? '' : 'none' }
  }

  const remove = async () => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (ok) {
      removeBlogDispatch(blog)
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
        <button onClick={() => likeBlogDispatch(blog)}>like</button> <br />
        added by {creator} <br />
        <button style={toggle(showRemove)} onClick={remove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  likeBlogDispatch: PropTypes.func.isRequired,
  removeBlogDispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    // blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlogDispatch: likeBlog,
  removeBlogDispatch: removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog