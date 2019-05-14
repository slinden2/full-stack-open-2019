const initialNotification = {
  message: '',
  error: false
}

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'DISPLAY_NOTIFICATION':
    return action.data
  case 'HIDE_NOTIFICATION':
    return initialNotification
  default:
    return state
  }
}

export const setNotification = (data, delay) => {
  return dispatch => {
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, delay*1000)
  }
}

// Can be called from reducers
export const setNotificationNoDispatch = (dispatch, data, delay) => {
  dispatch({
    type: 'DISPLAY_NOTIFICATION',
    data
  })
  setTimeout(() => {
    dispatch({
      type: 'HIDE_NOTIFICATION'
    })
  }, delay*1000)
}

export default reducer