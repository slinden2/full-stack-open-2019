import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ notify, blogFormRef, orderedBlogs }) => {

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
      {orderedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          notify={notify}
        />
      )}
    </div>
  )

}

const sortedBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes)

const mapStateToPros = state => {
  return {
    blogs: state.blogs,
    orderedBlogs: sortedBlogs(state.blogs)
  }
}

const ConnectedBlogList = connect(mapStateToPros)(BlogList)

export default ConnectedBlogList