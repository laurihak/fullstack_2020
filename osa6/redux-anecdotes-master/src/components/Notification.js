import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green'
  }
  if (notification)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  return (null)
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification