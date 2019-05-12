const initialNotification = {
  message: '',
  error: false
}

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'DISPLAY':
    return action.data
  case 'HIDE':
    return initialNotification
  default:
    return state
  }
}

export const setNotification = (data, delay) => {
  return dispatch => {
    dispatch({
      type: 'DISPLAY',
      data
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, delay*1000)
  }
}

export default reducer