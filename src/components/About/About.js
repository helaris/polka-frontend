import React from "react"
import AboutImg from "../../assets/About.png"


import "./About.css"

function About() {
  return (
    <>
      <div className="about__header">
        <h1>About us</h1>
        <img src={AboutImg} alt="event image" />
      </div>
      <section className="about">
        <h3>Polka - Find Friends for life now!</h3>
        <p>
          Let´s change the system - one friendship at a time! People with disability are excluded from
          the traditional ways of making friends and are also isolated and excluded from society. As a
          result of these two factors, people with disability often find it harder to make and sustain
          connections. Friendships are important aspects of social inclusion as they provide people
          with an opportunity to build a network of people around them that are their own age.
          Friendships also allow people to express their ideas in a safe environment, and generally
          have some fun and a laugh. Find new friends and hobbies now at Polka!
      </p>
      </section>
    </>
  )
}

export default About
