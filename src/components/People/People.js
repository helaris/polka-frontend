import React, { useState, useEffect } from "react"
import Person from "./Person"
import Loader from '../Loader/Loader'
import backend from "../../api"

import Friends from "../../assets/test.png"

import "./People.css"

function Groups() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await backend.get("api/user/all")
      setPeople(request.data)
      setLoading(false)
      return request
    }
    fetchData()
  }, [])

  return (
    <section className="people__section">
      <div className="people__header">
        <h1>Find new friends</h1>
        <img src={Friends} alt="friends image" />
      </div>
      {loading ? <Loader /> : (
        <ul className="people__list">
          {people.map((user) => (
            <Person User={user} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default Groups
