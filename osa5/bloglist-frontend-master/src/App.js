import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState()
  const [error, setError] = useState()

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('loggin in with', username, password)
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessage(`${user.username} logged in succesfully`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    renderBlogs()
  }

  const blogList = () => {
    return(
    <ul>
      {
        blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)} />
        )
      }
    </ul>
    )
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to logout ${user.username}`)) {
      try {
        window.localStorage.removeItem('loggedBlogappUser')
        setMessage(`${user.username} logged out succesfully`)
        setError(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setMessage('error with logging out')
        setError(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      setMessage(`cancelled logging out, ${user.username} is still logged in`)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    renderBlogs()
  }

  const handleDelete = async (blogObject) => {
    console.log(blogObject)
    console.log(blogObject.id)
    blogObject.likes = blogObject.likes + 1


    if (window.confirm(`Are you sure you want to delete ${blogObject.title}?`)) {
      try {
        await blogService.deleteBlog(blogObject.id)
        setMessage(`blog ${blogObject.title} deleted succesfully`)
        setError(false)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch {
        setMessage(`could not delete ${blogObject.title}`)
        setError(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      setMessage(`cancelled deleting ${blogObject.title} succesfully`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    renderBlogs()
  }

  const handleLike = async (blogObject) => {
    console.log(blogObject)
    console.log(blogObject.id)
    blogObject.likes = blogObject.likes + 1

    try {
      await blogService.update(blogObject.id, blogObject)
      setMessage(`blog ${blogObject.title} liked succesfully`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage(`blog ${blogObject.title} like did not go through succesfully`)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    renderBlogs()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      console.log('newblog ', blogObject)
      await blogService.create(blogObject)
      setMessage(`blog ${blogObject.title} created succesfully`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('error with creating a blog', exception)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    renderBlogs()
  }
  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const renderBlogs = async() => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
  }

  useEffect(() => {
    renderBlogs()
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )


  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} error={error} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App