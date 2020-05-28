const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)


  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}
export const setNotification = (notification,time) => {
  return dispatch => {
      dispatch({
          type: "SET_NOTIFICATION",
          notification: notification
      });
      setTimeout(() => {
          dispatch({type: "HIDE_NOTIFICATION"})
      },time * 1000)
  }
}


export default notificationReducer