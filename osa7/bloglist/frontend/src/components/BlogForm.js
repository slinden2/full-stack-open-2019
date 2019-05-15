import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { initUsers } from '../reducers/userReducer'

const BlogForm = props => {
  const notify = props.notify
  const blogFormRef = props.blogFormRef

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
      // Reinit users so that the num of blogs on the users view
      // updated without reloading
      props.createBlog(blogObject).then(() => props.initUsers())
      title.reset()
      author.reset()
      url.reset()
      blogFormRef.current.toggleVisibility()
      notify(`a new blog ${blogObject.title} successfully added`)
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
          <input {...title.excludeReset()} />
        </div>
        <div>
          author:
          <input {...author.excludeReset()} />
        </div>
        <div>
          url:
          <input {...url.excludeReset()} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  initUsers
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm