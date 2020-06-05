import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  let error
  if(notification) {
    error = notification[1]
  }

  if (notification === undefined || notification === null) {
    return null
  }
  if (error === true) {
    return (
      <Alert variant='danger'>{notification}</Alert>
    )
  } else {
    return (
      <Alert variant='success'>{notification}</Alert>
    )
  }
}


export default Notification