import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input } from 'semantic-ui-react'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { initUsers } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = props => {
  const [title, resetTitle] = useField('title')
  const [author, resetAuthor] = useField('author')
  const [url, resetUrl] = useField('url')

  const blogFormRef = props.blogFormRef

  const handleBlogCreation = async event => {
    event.preventDefault()
    let blogObject = {}
    for (const input of event.target.querySelectorAll('input')) {
      blogObject[input.name] = input.value
    }

    try {
      props.createBlog(blogObject)
      resetTitle()
      resetAuthor()
      resetUrl()
      props.setNotification(
        `a new blog ${blogObject.title} successfully added`, false, 5)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      props.setNotification('Blog was not added!', true, 5)
    }
  }

  const formStyle = {
    marginBottom: '5px'
  }

  return (
    <div>
      <h1>create new</h1>
      <Form style={formStyle} onSubmit={event => handleBlogCreation(event)}>
        <Form.Field>
          <label>title:</label>
          <Input {...title} />
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <Input {...author} />
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <Input {...url} />
        </Form.Field>
        <Button primary type="submit">create</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  initUsers,
  setNotification
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)

export default ConnectedBlogForm