import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  let newState
  let id
  let blogToChange
  let likedBlog

  switch (action.type) {
  case 'INIT_BLOGS':
    newState = action.data.map(a =>
      a.id !== id ? a : likedBlog)
    return action.data
  case 'ADD_BLOG':
    newState = [...state, action.data]
    return newState
  case 'ADD_COMMENT':
    newState = [...state, action.data]
    return newState
  case 'ADD_LIKE':
    id = action.data.id
    blogToChange = state.find(b => b.id === id)
    likedBlog = {
      ...blogToChange,
      votes: blogToChange.votes + 1
    }
    newState = state.map(a =>
      a.id !== id ? a : likedBlog)
    return newState
  case 'REMOVE_BLOG':
    id = action.data.id
    newState = state.map(b => b.id !== id)
    return newState
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const addLike = (id) => {
  return async dispatch => {
    await blogService.likeBlog(id)
    dispatch({
      type: 'ADD_LIKE',
      data: { id }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const createNewComment = (id, content) => {
  return async dispatch => {
    await blogService.createComment(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      date: content
    })
  }
}


export default blogReducer