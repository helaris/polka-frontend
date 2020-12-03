import React, { useState, useEffect } from "react"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from '@material-ui/core/styles'

import team from "../../assets/team.jpg"


import "./GroupPage.css"

const useStyles = makeStyles({
  icon: {
    color: '#263B96',
  },
});

/* eslint-disable react/prop-types */
function GroupPage({ setClickedGroup, groupName, addMember, deleteMember, userId }) {
  const [memberExist, setMemberExist] = useState(false);
  const [membersNum, setMembersNum] = useState(0)

  const emptyGroupArrray = () => {
    setClickedGroup([])
  }

  useEffect(() => {
    const same = (member) => member === userId;
    const boolean = groupName.members.some(same);
    if (boolean === true) {
      setMemberExist(true)
      setMembersNum(groupName.members.length)
    }
  }, [groupName])

  const handleAddClick = () => {
    addMember()
    setMemberExist(true)
    setMembersNum(membersNum + 1)
  }
  const handleRemoveClick = () => {
    deleteMember()
    setMemberExist(false)
    setMembersNum(membersNum - 1)
  }

  const classes = useStyles();

  return (
    <li className="groupPage">
      <div className="checkBox" onClick={() => emptyGroupArrray()}>
        <IconButton className="checkBoxIcon">
          <ArrowBackIosIcon className={classes.icon} role="presentation" />
        </IconButton>
      </div>
      <img
        className="groupPage__photo"
        src={team}
        alt="generic group"
      />
      <div className="groupPage__info">
        <h2 className="groupPage__header">{groupName.name} </h2>
        <p className="groupPage__description">Description: {groupName.description} </p>
        <p className="groupPage__members">Members: {membersNum} </p>
      </div>
      <div className="groupPage__icons">
        <p>Join</p>
        {memberExist === true ? (
          <ul onClick={(() => handleRemoveClick())}>
            <IconButton className="checkBoxIcon" >
              <CheckBoxIcon className={classes.icon} fontSize="large" />
            </IconButton>
          </ul>
        ) : (
            <ul onClick={(() => handleAddClick())}>
              <IconButton className="CheckBoxOutlineBlankIcon">
                <CheckBoxOutlineBlankIcon className={classes.icon} fontSize="large" />
              </IconButton>
            </ul>
          )}
      </div>
    </li>
  )
}

export default GroupPage
