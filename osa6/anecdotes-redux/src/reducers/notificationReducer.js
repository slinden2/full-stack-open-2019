const reducer = (state = '', action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.data
    case 'HIDE':
      return ''
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

export default reducer