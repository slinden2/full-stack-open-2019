import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})
  const [timeoutId, setTimeoutId] = useState(0)

  const username = useField('Username')
  const password = useField('Password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, error) => {
    if (timeoutId) clearTimeout(timeoutId)
    setNotification({ message, error })
    const id = setTimeout(() => {
      setNotification({})
      setTimeoutId(0)
    }, 5000)
    setTimeoutId(id)
  }

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      username.reset()
      password.reset()
      blogService.setToken(user.token)
      notify(`${credentials.username} successfully logged in`, false)

    } catch (exception) {
      notify(`${exception.response.data.error}`, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    notify(`${user.username} successfully logged out`, false)
    setUser(null)
  }

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        notify={notify}
        blogFormRef={blogFormRef}
      />
    </Togglable>
  )

  const blogRows = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs.map(blog =>
      <Blog
        key={blog.id}
        user={user}
        blog={blog}
        blogs={blogs}
        notify={notify}
        setBlogs={setBlogs}
      />)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={(event) => handleLogin(event)} className='loginform'>
          <div>
            username
            <input {...username.excludeReset()} />
          </div>
          <div>
            password
            <input {...password.excludeReset()} />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogForm()}
      {blogRows()}
    </div>
  )
}

export default App