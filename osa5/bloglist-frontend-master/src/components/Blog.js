import React, { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({blog, handleLike, handleDelete, user}) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.5,
  }

  const handleView = (event) => {
    setView(!view)
  }
  if (!view) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={handleView}>view</button></p>
      </div>
    )
  }
  if(user.username === blog.user.username) {
      return (
        <div style={blogStyle}>
          <p>{blog.title} <button onClick={handleView}>hide</button></p>
          <p>{blog.author}</p>
          <p>{blog.likes}<button onClick={handleLike}>like</button></p>
          <p>{blog.url}<button onClick={handleDelete}>delete</button></p>
        </div>
      )
    }  else {
      return (
        <div style={blogStyle}>
          <p>{blog.title} <button onClick={handleView}>hide</button></p>
          <p>{blog.author}</p>
          <p>{blog.likes}<button onClick={handleLike}>like</button></p>
          <p>{blog.url}</p>
        </div>
      )
    }
}


export default Blog
