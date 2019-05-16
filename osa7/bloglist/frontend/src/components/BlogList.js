import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { List } from 'semantic-ui-react'
import './BlogList.css'

const BlogList = ({ blogFormRef, blogs }) => {

  const blogForm = () => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef} />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      <List divided relaxed>
        {blogs.map(blog => (
          <List.Item key={blog.id}>
            <List.Content>
              <List.Header>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </List.Header>
              <List.Description>
                by {blog.author}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const mapStateToPros = state => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogList = connect(mapStateToPros)(BlogList)

export default ConnectedBlogList