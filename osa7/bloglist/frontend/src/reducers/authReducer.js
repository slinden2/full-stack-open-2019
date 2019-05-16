import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  const credentials = {
    username,
    password
  }

  return async dispatch => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
      dispatch(setNotification(
        `${loggedUser.username} has succesfully logged in`, false, 5
      ))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, true, 5))
    }
  }
}

export const setUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotification(
      'You have been successfully logged out', false, 5)
    )
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default reducer