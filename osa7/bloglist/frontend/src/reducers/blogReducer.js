import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_BLOG':
    // [...state, action.data]
    return state.map(b => b.id === action.data.id ? action.data : b)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'ADD_COMMENT': {
    // Deep copy needed because of a nested list
    const newState = JSON.parse(JSON.stringify(state))
    const newBlog = newState.find(blog => blog.id === action.data.blog)
    newBlog.comments = newBlog.comments.concat({ text: action.data.text, id: action.data.id })
    return [...newState.filter(blog => blog.id !== newBlog.id), newBlog]
  }
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(newBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
  }
}

export const addComment = (id, content) => {
  const comment = { text: content }
  return async dispatch => {
    const addedComment = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: addedComment
    })
  }
}

export default reducer