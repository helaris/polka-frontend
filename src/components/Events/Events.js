import React, { useState, useEffect } from "react"
import EventItem from "./EventItem"
import EventPage from "./EventPage"
import backend from "../../api"

import Calender from "../../assets/calender.png"

import "./Events.css"

function Events({ userId }) {
  const [eventName, setEventName] = useState([])
  const [clickedEvent, setClickedEvent] = useState([])

  async function fetchData() {
    const request = await backend.get("api/event")
    setEventName(request.data)
    return request
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getEvent = async (search) => {
    const request = await backend.get(`api/event/${search}`)
    setClickedEvent(request.data)
  }

  const addParticipant = async () => {
    const request = await backend.put("api/event/participant", {
      userId,
      eventId: clickedEvent[0]._id,
    })
    await fetchData()
  }

  const deleteParticipant = async () => {
    const request = await backend.put("api/event/", {
      userId,
      eventId: clickedEvent[0]._id,
    },
    )
    await fetchData()
  }

  return (
    <>
      <div className="events__header">
        <h1>Find new events</h1>
        <img src={Calender} alt="event image" />
      </div>
      <section className="event__section">
        {clickedEvent.length === 0 ? (
          <ul>
            {eventName.map((event) => (
              <EventItem
                getEvent={getEvent}
                eventName={event} />
            ))}
          </ul>
        ) : (
            <ul>
              {clickedEvent.map((event) => (
                <EventPage
                  setClickedEvent={setClickedEvent}
                  eventName={event}
                  addParticipant={addParticipant}
                  deleteParticipant={deleteParticipant}
                  userId={userId} />
              ))}
            </ul>
          )}
      </section>
    </>
  )
}

export default Events
