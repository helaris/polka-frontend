import React, { useState, useEffect } from "react"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import IconButton from "@material-ui/core/IconButton"
import halloweenImage from "../../assets/pablo-keep-distance.png"
import { makeStyles } from '@material-ui/core/styles'

import "./EventPage.css"

const useStyles = makeStyles({
  icon: {
    color: '#263B96',
  },
});

/* eslint-disable react/prop-types */
function EventPage({ setClickedEvent, eventName, addParticipant, deleteParticipant, userId }) {
  const [participantExist, setParticipantExist] = useState(false);
  const [participantsNum, setParticipantsNum] = useState(0)

  const emptyEventArrray = () => {
    setClickedEvent([])
  }

  useEffect(() => {
    const same = (participant) => participant === userId;
    const boolean = eventName.participants.some(same);
    if (boolean === true) {
      setParticipantExist(true)
      setParticipantsNum(eventName.participants.length)
    }
  }, [eventName])

  const handleAddClick = () => {
    addParticipant()
    setParticipantExist(true)
    setParticipantsNum(participantsNum + 1)
  }
  const handleRemoevClick = () => {
    deleteParticipant()
    setParticipantExist(false)
    setParticipantsNum(participantsNum -1)
  }

  const classes = useStyles();

  return (
    <li className="eventPage">
      <div className="eventPage__icons" onClick={() => emptyEventArrray()}>
        <IconButton className="checkBoxIcon">
          <ArrowBackIosIcon className={classes.icon} role="presentation" fontSize="large"  />
        </IconButton>
      </div>
      <img className="eventPage__photo" src={halloweenImage}
        alt="generic group"
      />
      <div className="eventPage__info">
        <h2 className="eventPage__header">{eventName.name} </h2>
        <p className="eventPage__description">Description: {eventName.description} </p>
        <p className="eventPage__description">Participants: {participantsNum} </p>
      </div>
      <div className="eventPage__icons" >
      <p>Participate</p>
      {participantExist === true ? (
          <ul onClick={(() => handleRemoevClick())}>
            <IconButton className="checkBoxIcon" >
              <CheckBoxIcon className={classes.icon} fontSize="large" />
            </IconButton>
          </ul>
        ) : (
          <ul onClick={(() => handleAddClick())}>
          <IconButton className="CheckBoxOutlineBlankIcon">
            <CheckBoxOutlineBlankIcon className={classes.icon} fontSize="large"  />
          </IconButton>
        </ul>
     )}
        </div>
    </li>
  )
}

export default EventPage
