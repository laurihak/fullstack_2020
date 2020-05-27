const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)


  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
      case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}
export const setNotification = (message) => {
  return { type: 'SET_NOTIFICATION',
  data: {message} }
}
export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export default notificationReducer