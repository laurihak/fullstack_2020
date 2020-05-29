const initialState = null
let timeOutId

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.timer !== undefined) {
    console.log('Resetting timer', action.timer)
    clearTimeout(timeOutId)
  }
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}
export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: notification,
      timer: null
    });
    timeOutId = setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION", timer:timeOutId })
    }, time * 1000)
  }
}


export default notificationReducer