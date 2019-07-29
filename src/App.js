import React from 'react';
import Event from './components/event/Event'
import EventMarket from './components/eventmarkets/EventMarkets'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


class App extends React.Component {
  constructor() {
    super()
    this.handleEventURL = this.handleEventURL.bind(this)
    this.state = {
      data: null
    }
  }
    componentDidMount() {
      let client
      let data
      const promise = new Promise((resolve) => {
        client = new WebSocket('ws://localhost:8889/', 'echo-protocol')
        client.onopen = () => {
          resolve(client)
        }
      })  

      promise.then(() => {
        client.addEventListener("message", (m) => {
          const data = JSON.parse(m.data)
          if(data.type !== "INIT") {
            this.setState({data: data})
          }
        })
        client.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: true }))
      }).catch(e => {
        console.log(e)
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
