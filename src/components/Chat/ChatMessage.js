import React from 'react'
import userService from '../../services/user-service'
import './ChatMessage.css'

const Message = ({ userId, message }) => {
  const image = userService.getImage(message.sender.avatar)
  return (
    <>
      {userId === message.sender._id ? 
        <div className="message__container message__container--sender">
          <img src={image} />
          <div className="message message--sender arrow arrow--sender">
            <p>{message.text}</p>
          </div>
        </div>
      : <div className="message__container message__container--receiver">
          <div className="message message--receiver arrow arrow--receiver">
            <p>{message.text}</p>
          </div>
          <img src={image} />
        </div>
      }
    </>
  )
}

export default Message;
