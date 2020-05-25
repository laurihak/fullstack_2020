import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }
  const handleUser = async() => {
    const user = await window.localStorage.getItem('loggedBlogappUser')
    return user
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: handleUser() ? null : handleUser()
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form onSubmit={addBlog} >
      <div>
        title:
        <input
          id='title'
          type='text'
          value={newTitle}
          name='Title'
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type='text'
          value={newAuthor}
          name='Author'
          onChange={handleChangeAuthor}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type='text'
          value={newUrl}
          name='Url'
          onChange={handleChangeUrl}
        />
      </div>
      <button id='create-button' type='submit'>create</button>
    </form>
  )
}

export default BlogForm