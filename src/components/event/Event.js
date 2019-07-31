import React from 'react';
import './event.css'
import { Link } from "react-router-dom"

function Event(props) {
  function handleClick() {
    props.pickURL(props.id)
  }
  const time = props.time.slice(11,16)
  return(
    <Link to={`/event/${props.id}`} onClick={(e) => handleClick(e)} className="event">
        <span className="event_time">{time}</span>
        <span>{props.name}</span>
    </Link>
  )
}

export default Event;

