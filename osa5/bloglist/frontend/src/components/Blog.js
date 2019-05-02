import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blog, blogs, setBlogs, notify }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  let showRemove = false
  if (user.username === blog.user.username) showRemove = true

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

  const updateLikes = async () => {
    const newBlog = { ...blog, likes: likes + 1 }
    await blogService.update(newBlog)
    setBlogs(blogs.filter(b => blog.id !== b.id).concat(newBlog))
    setLikes(likes + 1)
  }

  const removeBlog = async () => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)

    if (ok) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => blog.id !== b.id))
      notify(`${blog.title} removed successfully`, false)
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={toggle(visible)}>
        {blog.url} <br />
        {likes}
        <button onClick={updateLikes}>like</button> <br />
        added by {blog.user.name} <br />
        <button style={toggle(showRemove)} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog