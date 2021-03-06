import React from 'react'


const Notification = ({ message, error }) => {
  const errorStyle = {
    color: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const noficationStyle = {
    color: 'green',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === undefined || message === null) {
    return null
  }
  if (error === true) {
    return (
      <div style={errorStyle} id='error'>
        {message}
      </div>
    )
  } else {

    return (
      <div style={noficationStyle} id='notification' >
        {message}
      </div>
    )
  }
}


export default Notification