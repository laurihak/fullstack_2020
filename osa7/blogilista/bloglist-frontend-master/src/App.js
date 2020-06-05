import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { BlogWithInfo } from './components/Blog'
import { User, UserWithInfo } from './components/User'
import NavigationBar from './components/NavigationBar'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog, } from './reducers/blogReducer'
import { setUser, logOutUser, receiveUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'




const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  console.log('user in app', user)
  const dispatch = useDispatch()

  console.log('this is the dispatch function', dispatch)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(receiveUser())
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    console.log('after dispatch changes should be initialized')
    dispatch(initializeBlogs())
  }, [dispatch])


  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(setUser(username, password))
    setUsername('')
    setPassword('')
    dispatch(setNotification(`${username} logged in succesfully`))
  }

  const userList = () => {

    console.log(users)
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>blogs added</th>
          </tr>
        </thead>
        {users.map(u => <User key={u.username} user={u} />)}
      </Table>
    )
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to logout ${user.username}`)) {
      try {
        dispatch(logOutUser())
        dispatch(setNotification(`${user.username} logged out succesfully`, 5, false))
      } catch (exception) {
        dispatch(setNotification('error in with logging out', 5, true))
      }
    } else {
      dispatch(setNotification(`cancelled logging out ${user.username} succesfully`, 5, false))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog(blogObject))
      dispatch(setNotification(`blog ${blogObject.title} created succesfully`, 5, false))
    } catch (exception) {
      dispatch(setNotification(`error with creating blog ${exception}`, 5, true))
    }
  }
  const blogForm = () => (
    <Togglable id='new-blog' buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user} />
    </Togglable>
  )

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

  const matchUser = useRouteMatch('/users/:id')
  const userToFind = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogToFind = matchBlog
    ? blogs.find(u => u.id === matchBlog.params.id)
    : null

  return (
    <div className='container'>
      <NavigationBar user={user} handleLogOut={handleLogOut} />
      <Notification />
      <h1>Blogs</h1>
      {user === null ?
        <Switch>
          <Route path='/login'>{loginForm()}</Route>
        </Switch> :
        <div>
          <Switch>
            <Route path='/blogs/:id'>
              {<BlogWithInfo blog={blogToFind} users={users} />}
            </Route>
            <Route path='/users/:id'>
              {<UserWithInfo user={userToFind} />}
            </Route>
            <Route path='/users'>{userList()}</Route>
            <Route path='/'>
              {blogForm()}
              {<BlogList user={user} blogs={blogs} />}
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App