import React from 'react';
import './event.css'
import { Link } from "react-router-dom"

function Event(props) {
  function handleClick() {
    props.pickURL(props.data)
    console.log(props.data)
  }
  const time = props.data.startTime.slice(11,16)
  return(
    <Link to={`/event/${props.data.eventId}`}>
      <button className="event" type="button" onClick={(e) => handleClick(e)}>
        <span className="event_time">{time}</span>
        <span>{props.data.name}</span>
      </button>
      </Link>
  )
}

export default Event;

