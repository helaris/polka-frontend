// import React, { useState, useEffect } from "react"
import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles'

import team from "../../assets/team.jpg"


import "./Groupitem.css"

const useStyles = makeStyles({
  button: {
    height: 45,
    width: 200,
  },
});

/* eslint-disable react/prop-types */
function GroupItem({ getGroup, groupName }) {
  const classes = useStyles();
  return (
    <li className="groupItem" role="presentation" onClick={() => getGroup(groupName.name)}>
      <img
        className="groupPicture"
        src={team}
        alt="generic group"
      />
      <div className="group__info">
        <h2 className="groupItem__header">{groupName.name} </h2>
        <p className="groupItem__description">{groupName.description} </p>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        borderColor="text.primary"
        type="submit">
        Join group
        </Button>
    </li>
  )
}

export default GroupItem
