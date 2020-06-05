import React from 'react'
import { Blog } from './Blog'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const handleDelete = async (blogObject) => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title}?`)) {
      try {
        dispatch(removeBlog(blogObject.id))
        dispatch(setNotification(`blog ${blogObject.title} deleted succesfully`, 5, false))
      }
      catch (error) {
        dispatch(setNotification('error in deleting blog', 5, true))
      }
    } else {
      dispatch(setNotification(`cancelled deleting ${blogObject.title} succesfully`, 5, false))
    }
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {
            blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleDelete={() => handleDelete(blog)} />

            )
          }
        </tbody>
      </Table>
    </div>)
}

export default BlogList