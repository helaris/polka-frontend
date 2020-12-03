import React from 'react';
import ReactCardFlip from "react-card-flip";

const Card = ({ id, isFlipped, handleClick, cardNumber }) => {

  const showImage = () =>  <img src="https://media.healthyfood.com/wp-content/uploads/2017/03/In-season-August-Lemons.jpg" style={{width: '50px'}}/>

  return (
  <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
    <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="front">

    </button>

    <button id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="back">
      { showImage() }
    </button>
  </ReactCardFlip>
)
}

export default Card;