const initialState = {
  message: '',
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.data
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

export const createNotification = (message, error) => {
  return {
    type: 'DISPLAY',
    data: { message, error }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer