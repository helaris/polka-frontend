import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader'
import base64js from 'base64-js'

import "./Person.css"

/* eslint-disable react/prop-types */
function Person({ User }) {

  const [avatar, setAvatar] = useState(null);
  console.log(User)
  useEffect(() => {
    if (User.avatar) {
      const avatar = base64js.fromByteArray(User.avatar.data)
      setAvatar('data:image/png;base64,' + avatar);
    } else {
      setAvatar('https://images.vexels.com/media/users/3/140800/isolated/preview/86b482aaf1fec78a3c9c86b242c6ada8-man-profile-avatar-by-vexels.png')
    }
  }, [])

  return (
    <section className="person">
      <div className="userinfo">
        <img
          src={avatar}
          alt="generic profile"
        />
        <p className="person__names">
          {User.firstName} {User.lastName}{" "}
        </p>
        <p className="intrests">Intrested in {User.interests ?? "golf"}</p>
      </div>
      {/* <section className="intrest__container">
        <h3>Intrests</h3>
        <p>{User.intrests ?? "golf"}</p>
      </section> */}
      {/* <br />
      <h4>Interests:</h4> */}
      {/* <div>
        <List >
          <ListItemIcon>
            {User.interests ?? "golf"}
          </ListItemIcon>
          <ListItemIcon>
            {User.interests ?? "tennis"}
          </ListItemIcon>
        </List>
        <Divider />
        <CardHeader text="LOL" />
      </div> */}
      <Link to={`people/${User.username}`}>
        <Button variant="contained" color="primary">
          See profile
      </Button>
      </Link>
    </section>
  )
}

export default Person
