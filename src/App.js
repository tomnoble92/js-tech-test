import React from 'react';
import Event from './components/event/Event'
import EventMarket from './components/eventmarkets/EventMarkets'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import {socketPromise} from './websocket'

class App extends React.Component {
  constructor() {
    super()
    this.handleEventURL = this.handleEventURL.bind(this)
    this.state = {
      data: null
    }
  }
    componentDidMount() {
      socketPromise().then((ws) => {
        this.setState({socket: ws})
        ws.addEventListener("message", (m) => {
            const data = JSON.parse(m.data)
            if(data.type !== "INIT") {
              this.setState({data: data})
            }
          })
          ws.send(JSON.stringify({type: "getLiveEvents",  primaryMarkets: true }))
    }).catch(err => {
        console.log(err)
    })
  }

    handleEventURL(data) {
      this.setState({url: data.eventId, selectedEvent: data})
      sessionStorage.setItem('url', data.eventId)
      sessionStorage.setItem('event', JSON.stringify(data))
    }

    render() {

      if(this.state.data !== null) {
        const data = this.state.data.data
        const matches = data.map((match) => <Event time={match.startTime} name={match.name} id={match.eventId} key={match.eventId} pickURL={this.handleEventURL}/>)
      return(
        <div>
            <Route exact path='/' render={() => (
            <section className="event-class-container">
            <header>
              <h1 className="event-class-title">Live Football Events</h1>
            </header>
            {matches}
          </section>
          )}/>
          <Route path={`/event/${sessionStorage.getItem('event')}`} render={() => <EventMarket />} />
        </div>
      
      )
      } else {
        return (
          <div>Loading</div>
        )
      }
      
 
      
    }
}

export default App;
