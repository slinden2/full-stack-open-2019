import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'ADD':
    return [...state, action.data]
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export default reducer