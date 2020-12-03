import React from "react"
import { Link } from "react-router-dom"
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

import "./Footer.css"

function Footer() {
  return (
    <section className="footer">
      <ul className="footer__container">
        <li className="footer__item">
          <Link to="/about">About</Link>
        </li>
        <li className="footer__item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="footer__icons">
        <div className="LinkedInIcon"><LinkedInIcon fontSize="large" /></div>
        <div className="FacebookIcon"><FacebookIcon fontSize="large" /></div>
        <div className="InstagramIcon"><InstagramIcon fontSize="large" /></div>
      </div>
    </section>
  )
}

export default Footer
