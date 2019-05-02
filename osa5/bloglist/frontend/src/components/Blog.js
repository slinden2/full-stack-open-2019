import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={toggleDetails}>
        {blog.url} <br />
        {blog.likes}
        <button>like</button> <br />
        added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog