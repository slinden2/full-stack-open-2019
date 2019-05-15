import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { List } from 'semantic-ui-react'
import './BlogList.css'

const BlogList = ({ notify, blogFormRef, blogs }) => {

  const listStyle = {
    border: '1px solid',
    borderRadius: '8px',
    padding: '5px',
    marginBottom: '3px',

  }

  const blogForm = () => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm
        notify={notify}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      <List>
        {blogs.map(blog =>
          <List.Item
            key={blog.id}
            className='blogitem'
            style={listStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </List.Item>
        )}
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