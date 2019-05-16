import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Route, Redirect, NavLink
} from 'react-router-dom'
import { Container, Menu, Form, Button } from 'semantic-ui-react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { login, setUser, logout } from './reducers/authReducer'
import { initUsers } from './reducers/userReducer'

const App = props => {
  const [username, resetUsername] = useField('username')
  const [password, resetPassword] = useField('password')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    props.setUser()
  }, [])

  useEffect(() => {
    props.initUsers()
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    props.login(username.value, password.value)
    resetUsername()
    resetPassword()
  }

  const userById = id => props.users.find(user => user.id === id)
  const blogById = id => props.blogs.find(blog => blog.id === id)

  const blogFormRef = React.createRef()

  if (props.user === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={(event) => handleLogin(event)} className='loginform'>
          <Form.Field>
            <label>username</label>
            <input {...username} />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input {...password} />
          </Form.Field>
          <Button type="submit" data-cy="login">log in</Button>
        </Form>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <Menu>
          <Menu.Item name='blogs' as={NavLink} exact to='/' content='blogs' />
          <Menu.Item name='users' as={NavLink} exact to='/users' content='users' />
          <Menu.Item name='logout' content='logout' onClick={props.logout} />
        </Menu>
        {props.user.username} logged in
        <h1>blogs app</h1>
        <Notification />
        <Route exact path="/" render={() =>
          <BlogList blogFormRef={blogFormRef} />}
        />
        <Route exact path="/users" render={({ match }) =>
          <Users path={match.path} />}
        />
        <Route path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
        <Route path="/blogs/:id" render={({ match }) =>
          blogById(match.params.id) ?
            <Blog
              path={match.path}
              blog={blogById(match.params.id)}
            /> :
            <Redirect to="/" />
        } />
      </Router>
    </Container>
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