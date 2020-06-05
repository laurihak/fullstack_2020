const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  console.log(blogs)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  let blog = await Blog.findById(request.params.id).populate('comments', {content: 1})
  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = new Comment(request.body)
  const token = getTokenFrom(request)
  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  const user = await User.findById(decodedToken.id)
  
  comment.user = user
  const savedComment = await comment.save()
  user.comments = user.comments.concat(savedComment.id)
  blog.comments = blog.comments.concat(savedComment.id)
  await user.save()
  await blog.save()

  response.status(201).json(savedComment)
})


blogsRouter.delete('/:id', async (request, response) => {
  const token = await getTokenFrom(request)
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'only the creater can delete blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.json(updatedBlog.toJSON())
  } else {
    response.status(400).end()
  }
})


module.exports = blogsRouter