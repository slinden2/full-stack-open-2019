import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = { display: visible ? '' : 'none' }

  const updateLikes = async () => {
    const newBlog = { ...blog, likes: likes + 1 }
    await blogService.update(newBlog)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={toggleDetails}>
        {blog.url} <br />
        {likes}
        <button onClick={updateLikes}>like</button> <br />
        added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog