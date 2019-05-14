import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotificationNoDispatch } from './notificationReducer'

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

export const login = credentials => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })
      const notificication = {
        message: `${loggedUser.username} has succesfully logged in`,
        error: false
      }
      setNotificationNoDispatch(dispatch, notificication, 5)
    } catch (exception) {
      const error = {
        message: exception.response.data.error,
        error: true
      }
      setNotificationNoDispatch(dispatch, error, 5)
    }
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default reducer