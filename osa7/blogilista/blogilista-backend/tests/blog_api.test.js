const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')


const MatchBlogsIdWithFirstUser = async () => {
  const users = await helper.usersInDb()
  const user = users[0]
  const blogs = await helper.blogsInDb()

  user.blogs = blogs.map(blog => blog.id)

  await Blog.updateMany({}, { $set: { user: user.id } })
}


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await MatchBlogsIdWithFirstUser()
})

describe('when there is initially blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs have id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .get('/api/blogs')
      .expect(200)

    blogsAtStart.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('the first blog is the one added first', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'HTML is easy'
    )
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added token', async () => {

      const token = await helper.token()
      const newBlog = {
        title: 'Backend testing is hard',
        author: 'Aku Ankka',
        url: 'www.stackoverflow.com',
        userId: '5ebe7a4608a36b18bc1c3710'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'Backend testing is hard'
      )
    })
    test('blog without entered likes will have 0 likes', async () => {

      const token = await helper.token()
      const newBlog = {
        title: 'Testing is hard',
        author: 'Aku Ankka',
        url: 'www.stackoverflow.com',
        userId: '5ebe7a4608a36b18bc1c3710'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(b => b.likes)

      expect(likes[blogsAtEnd.length - 1]).toEqual(0)
    })
    test('blog without title or url will not be added', async () => {
      const blogsAtStart = await helper.initialBlogs
      const token = await helper.token()

      const newBlogWithoutTitle = {
        author: 'Aku Ankka',
        url: 'www.stackoverflow.com',
        userId: '5ebe7a4608a36b18bc1c3710'
      }
      const newBlogWithoutUrl = {
        title: 'Testing is hard',
        author: 'Aku Ankka',
        userId: '5ebe7a4608a36b18bc1c3710'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlogWithoutTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlogWithoutUrl)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
    })
  })

  describe('deletion of blog with valid token is confirmed', () => {
    test('deleting a blog if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const token = await helper.token()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
    test('deletion a blog with invalid token comes back with proper statuscode', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      let token = await helper.token()
      token = token.substr(0, token.lenght-1)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(blogToDelete.title)
    })
  })
})

describe('updating of blogs ', () => {
  test('updating one blogs likes to 1', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const token = await helper.token()

    const updatedBlog = {
      title: 'HTML is easy',
      author: 'Mikki Hiiri',
      url: 'www.google.com',
      likes: 1,
      userId: '5ebe7a4608a36b18bc1c3710',
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', token)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)

    expect(blogsAtEnd[0].likes).toEqual(updatedBlog.likes)
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }



      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if username is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username is invalid')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('creation fails with proper statuscode and message if password is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'withoutPassword',
        name: 'Superuser',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is invalid')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})