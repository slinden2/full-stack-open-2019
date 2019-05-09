const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY':
      console.log(action.data);
      return action.data
    case 'HIDE':
      console.log(action);
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, delay) => {
  return dispatch => {
    dispatch({
      type: 'DISPLAY',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, delay * 1000);
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