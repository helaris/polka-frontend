import React, { useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AuthService from "../../services/auth-service"
import backend from '../../api'

import Logo from "../../assets/logo_transparent.png"


import "./Nav.css"

const Nav = ({ userId, setUserId }) => {
  const [click, setClick] = useState(false)
  const [username, setUsername] = useState("")

  const handleClick = () => setClick(!click)

  const handleLogOut = () => {
    AuthService.logout();
    setUserId(undefined);
  };

  useEffect(() => {
    const getUsername = async () => {
      const res = await backend.get(`api/user/${userId}`)
      setUsername(res.data.username)
    }
    getUsername()
  }, [userId])

  return (
    <nav className="nav">
      <div className="nav__container">
        {userId ? (
          <>
            <div className="nav__logo" >
              <Link to={`/people/${username}`}>
              <img src={Logo} alt="Polka logo" />
              </Link>
            </div>
            <ul
              className={`nav__menu ${click && "nav_menu active"}`}
              onClick={handleClick}
              role="presentation"
            >
              <li className="nav__item">
                <Link to={`/people/${username}`}>Profile</Link>
              </li>
              <li className="nav__item">
                <Link to="/games">Games</Link>
              </li>
              <li className="nav__item">
                <Link to="/people">People</Link>
              </li>
              <li className="nav__item">
                <Link to="/events">Events</Link>
              </li>
              <li className="nav__item">
                <Link to="/groups">Groups</Link>
              </li>
              <li className="nav__item">
                <Link to="/chat">Chat</Link>
              </li>
              <li className="nav__item">
                <Link to="/" onClick={handleLogOut}>Log Out</Link>
              </li>
            </ul>
            <div className="mobile__icon" onClick={handleClick} role="presentation">
              {click ? <FaTimes /> : <FaBars />}
            </div>
          </>
        ) : (
            <>
            <div className="nav__logo" >
              <Link to={`/people/${username}`}>
              <img src={Logo} alt="Polka logo" />
              </Link>
            </div>
              <ul
                className={`nav__menu nav__loggedOut ${click && "nav_menu active"}`}
                onClick={handleClick}
                role="presentation"
              >
                <li className="nav__item login__logo" >
                  <AccountCircleIcon fontSize="large" className="AccountCircleIcon" />
                  <Link to="/login">Log In</Link>
                </li>
                <li className="nav__item" >
                  <Link to="/register">Sign up</Link>
                </li>
              </ul>
              <div className="mobile__icon" onClick={handleClick} role="presentation">
                {click ? <FaTimes /> : <FaBars />}
              </div>
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav
