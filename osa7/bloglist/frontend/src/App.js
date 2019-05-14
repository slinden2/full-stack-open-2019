import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, WithRouter
} from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { login, setUser, logout } from './reducers/authReducer'
import { initUsers } from './reducers/userReducer'
import blogService from './services/blogs'

const App = props => {
  const username = useField('Username')
  const password = useField('Password')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    props.initUsers()
  }, [])

  const notify = (message, error) => {
    props.setNotification({ message, error }, 5)
  }

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      props.login(credentials)
      username.reset()
      password.reset()
      notify(`${credentials.username} successfully logged in`, false)
    } catch (exception) {
      notify(`${exception.response.data.error}`, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    notify(`${props.user.username} successfully logged out`, false)
    props.logout()
  }

  const userById = id => props.users.find(user => user.id === id)

  const blogFormRef = React.createRef()

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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
      <Notification />
      <p>{props.user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Router>
        <Route exact path="/" render={() =>
          <BlogList
            notify={notify}  
            blogFormRef={blogFormRef}
          />}
        />
        <Route exact path="/users" render={({ match }) => <Users path={match.path} />} />
        <Route path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.auth,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification,
  initBlogs,
  login,
  setUser,
  logout,
  initUsers
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp