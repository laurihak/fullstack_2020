const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    id: '6a422aa71b54a676234d17f9',
    title: 'HTML is easy',
    author: 'Mikki Hiiri',
    url: 'www.google.com',
    likes: 0,
    __v: 0,
    user: '5ebe7a4608a36b18bc1c3710'
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '5ebe7a4608a36b18bc1c3710'
  },
]

const initialUsers = [
  {
    username: 'laurih',
    password: 'salainen',
    id: '5ebe7a4608a36b18bc1c3710'
  }
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(note => note.toJSON())
}

const token = async () => {
  const users = await usersInDb()
  const user = users[0]
  let token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET)
  token = token.toString()
  return ` bearer ${token}`

}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb, token
}