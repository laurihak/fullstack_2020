import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ createComment }) => {
  const [newContent, setNewContent] = useState('')

  const handleCommentChange = (event) => {
    setNewContent(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    createComment({
      content: newContent,
    })
    setNewContent('')
  }

  return (
    <Form onSubmit={addComment}>
      <Form.Group>
        <Form.Label>post your comment</Form.Label>
        <Form.Control
          id='content'
          type='text'
          value={newContent}
          name='content'
          onChange={handleCommentChange}
        />
        <Button variant='primary' id='create-button' type='submit'>create</Button>
      </Form.Group>
    </Form>)
}

export default CommentForm