import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog, createNewComment, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

import { Button } from 'react-bootstrap'



export const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.5,
  }

  const padding = {
    padding: 5
  }
  const handleView = () => {
    setView(!view)
  }
  if (!blog)
    return (null)
  if (!view) {
    return (
      <tr key={blog.id}>
        <td><Link to={`/blogs/${blog.id}`} style={padding}>{blog.title}</Link></td>
        <td>{blog.author}</td>
      </tr>
    )
  }
  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button id='hide-button' onClick={handleView}>hide</button></p>
        <p>{blog.author}</p>
        <p id='likes'>{blog.likes}<button id='like-button' onClick={handleLike}>like</button></p>
        <a href={blog.url} alt='no url found' target='_blank' rel='noopener noreferrer'><p>Link to blog</p></a><button id='delete-button' onClick={handleDelete}>delete</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={handleView}>hide</button></p>
        <p>{blog.author}</p>
        <p>{blog.likes}<button onClick={handleLike}>like</button></p>
        <a href={blog.url} alt='no url found' target='_blank' rel='noopener noreferrer'><p>Link to Blog</p></a>
      </div>
    )
  }
}

export const BlogWithInfo = ({ blog, users }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  if (!users)
    return null
  if (!blog)
    return null
  if (!users.find(u => u.id === blog.user.id)) {
    return null
  }
  const user = users.find(u => u.id === blog.user.id)



  const handleLike = (blog) => {
    try {
      dispatch(addLike(blog.id))
      dispatch(setNotification(`blog ${blog.title} liked succesfully`, 5, false))
      dispatch(initializeBlogs())
    } catch (error) {
      dispatch(setNotification('error in liking blog', 5, true))
    }
  }
  const handleDelete = async (blogObject) => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title}?`)) {
      try {
        dispatch(removeBlog(blogObject.id))
        dispatch(setNotification(`blog ${blogObject.title} deleted succesfully`, 5, false))
        dispatch(initializeBlogs())
        history.push('/')
      }
      catch (error) {
        dispatch(setNotification('error in deleting blog', 5, true))
      }
    } else {
      dispatch(setNotification(`cancelled deleting ${blogObject.title} succesfully`, 5, false))
    }
  }

  const addComment = async (commentObject) => {
    try {
      dispatch(createNewComment(blog.id, commentObject))
      dispatch(setNotification(`comment ${commentObject.content} created succesfully`, 5, false))
    } catch (exception) {
      dispatch(setNotification(`error with creating blog ${exception}`, 5, true))
    }
  }


  if (user.id !== blog.user.id)
    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes<Button onClick={() => handleLike(blog)}>like</Button></p>
        <p>Added by {user.name} </p>
      </div>
    )
  return (
    <div>
      <div>
        <h1>{blog.title}</h1>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes<Button variant='success' onClick={() => handleLike(blog)}>like</Button></p>
        <p>Added by {user.name} </p>
        <p><Button variant='danger' onClick={() => handleDelete(blog)}>delete blog</Button></p>
      </div>
      <h2>comments</h2>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
      <CommentForm createComment={addComment} user={user} />
    </div>
  )
}
