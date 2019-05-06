const initialState = {
  message: 'Alkuarvo',
  error: false
}

export const createNotification = (message, error) => {
  return {
    type: 'DISPLAY',
    data: { message, error }
  }
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

export default reducer