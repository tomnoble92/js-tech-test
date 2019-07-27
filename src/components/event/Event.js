import React from 'react';
import './event.css'


class Event extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }
    componentDidMount() {
    }

    render() {
      const time = this.props.data.startTime.slice(11,16)
        return (
        <button className="event">
          <span className="event__time">{time}</span>
          <span>{this.props.data.name}</span>
        </button>
        )
    }
}

export default Event;

