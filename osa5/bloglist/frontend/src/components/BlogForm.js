import React, { useState } from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, notify, blogFormRef }) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const handleBlogCreation = async event => {
    event.preventDefault()

    let blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
    }

    try {
      const blog = await blogService.create(blogObject)

      // Haen lisätyn blogin heti tietokannasta, jotta saan
      // lisääjän tiedot heti käyttöön. blog-muuttujassa on vain
      // lisääjän id.
      const newBlog = await blogService.getById(blog.id)
      title.reset()
      author.reset()
      url.reset()
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} successfully added`)
    } catch (exception) {
      notify(`${exception.response.data.error}`, true)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={event => handleBlogCreation(event)}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default BlogForm