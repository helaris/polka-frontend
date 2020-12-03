import React, { useState } from 'react'
import './ChatContact.css'
import RemoveIcon from '@material-ui/icons/HighlightOff'

const ChatContact = ({ name, id, img, handleClickCard, handleClickDelete }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <section className="contact__container" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <section className="contact__info" onClick={() => handleClickCard(id)}>
          <img className="contact__image" src={img} />
          <h1>{name}</h1>
      </section>
      <section>
        {handleClickDelete && hovering && 
          <RemoveIcon 
            onClick={() => handleClickDelete(id)}
            className="contact__delete"
            style={{
              color: '#f44336',
            }}
          />
        }
      </section>
    </section>
  )
}

export default ChatContact;