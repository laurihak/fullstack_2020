
let timeOutId

const notificationReducer = (state = null, action) => {
  console.log('action now', action)
  console.log('state now', state)

  if (action.timer !== undefined) {
    clearTimeout(timeOutId)
  }
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return [action.notification, action.error]
  case 'HIDE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (notification, time, error) => {
  console.log('setting notification')
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification,
      error: error,
      timer: null
    })
    timeOutId = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION', timer: timeOutId })
    }, time * 1000)
  }
}


export default notificationReducer