import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.5,
  }

  const handleView = () => {
    setView(!view)
  }
  if (!view) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button id='view-button' onClick={handleView}>view</button></p>
        <p>{blog.author}</p>
      </div>
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


export default Blog
