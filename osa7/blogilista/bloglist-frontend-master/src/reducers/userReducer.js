import blogService from '../services/blogs'
import userService from '../services/users'

const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const setUser = (username, password) => {
  return async dispatch => {
    const user = await userService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    console.log('settign token to user', user.token)
    blogService.setToken(user.token)
    console.log('this user about to be installed ', user)
    dispatch({
      type: 'SET_USER',
      user: user
    })
  }
}
export const receiveUser = () => {
  return async dispatch => {
    let user = await window.localStorage.getItem('loggedBlogappUser')
    if (user) {
      user = JSON.parse(user)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        user: user
      })
    }
  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}


export default userReducer