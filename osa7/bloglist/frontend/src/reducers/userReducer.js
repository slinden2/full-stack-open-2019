import userService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'ADD_BLOG': {
    const newState = state.map(user => {
      if (user.id === action.data.user.id) {
        const blog = (({ author, id, title, url }) =>
          ({ author, id, title, url }))(action.data)
        user.blogs = user.blogs.concat(blog)
        return user
      } else {
        return user
      }
    })
    return newState
  }
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}
export default reducer