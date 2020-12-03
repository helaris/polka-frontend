import React from "react"
import PhoneIcon from "@material-ui/icons/Phone"
import MailOutlineIcon from "@material-ui/icons/MailOutline"

import ContactImg from "../../assets/clip-chatting-and-speech-bubbles.png"

import "./ContactInfo.css"

function Contact() {
  return (
    <>
      <div className="contactInfo__header">
        <h1>Contact us</h1>
        <img src={ContactImg} alt="event image" />
      </div>
      <section className="contact">
        <p>
          If you have any questions, please get in contact with us, or with your doctor for more
          information on how to join this platform.
      </p>
        <h3>
          {" "}
          <PhoneIcon /> Phone: 12345
      </h3>
        <h3>
          {" "}
          <MailOutlineIcon /> Email: roccos@salt.com
      </h3>
      </section>
    </>
  )
}

export default Contact
