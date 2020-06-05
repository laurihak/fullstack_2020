import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const createComment = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const likeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  let object = await axios.get(`${baseUrl}/${id}`)
  object = {
    title: object.data.title,
    author: object.data.author,
    likes: object.data.likes +1,
    url: object.data.url,
    id: object.data.id,
    user: object.data.user,
    comments: object.data.comments
  }
  const response = await axios.put(`${baseUrl}/${id}`, object, config)
  return response.data
}

export default { getAll, create, createComment, update, setToken, removeBlog, likeBlog }