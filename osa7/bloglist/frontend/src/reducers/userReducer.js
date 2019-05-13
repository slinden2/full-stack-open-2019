import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'SET':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = credentials => {
  return async dispatch => {
    const loggedUser = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'LOGIN',
      data: loggedUser
    })
  }
}

export const setUser = user => {
  return {
    type: 'SET',
    data: user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default reducer