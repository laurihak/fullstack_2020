import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response.data)

  return response.data
}

const createNew = async (content, votes) => {
  const object = { content, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  let object = await axios.get(`${baseUrl}/${id}`)
  object = {
    content: object.data.content,
    votes: object.data.votes +1,
    id: object.data.id
  }
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, createNew, voteAnecdote }