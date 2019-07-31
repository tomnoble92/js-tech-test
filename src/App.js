import React from 'react';
import Event from './components/event/Event'
import EventMarkets from './components/eventmarkets/EventMarkets'
import history from './components/history/history'
import { Route } from "react-router-dom";
import './App.css';
import {socketPromise} from './websocket'

class App extends React.Component {
    constructor() {
      super()
      this.handleEventURL = this.handleEventURL.bind(this)
      this.state = {
        data: null,
        oddFormat: 'f'
      }
    }

    ws = new WebSocket('ws://localhost:8889/', 'echo-protocol')
    componentDidMount() {
      socketPromise(this.ws).then((ws) => {
        ws.onmessage = (m) => {
          const data = JSON.parse(m.data)
            if(data.type === "LIVE_EVENTS_DATA") {
              this.setState({data: data})
            }
        }
        ws.send(JSON.stringify({type: "getLiveEvents",  primaryMarkets: false }))
      }).catch(err => {
        console.log(err)
        this.setState({errorWebsocketDown: true})
      })
    }

    handleEventURL(data) {
      this.setState({url: data.eventId, selectedEvent: data})
      sessionStorage.setItem('url', data.eventId)
      sessionStorage.setItem('event', JSON.stringify(data))
    }

    OddsFormatToggle() {
      if(this.state.oddFormat === 'f') {
        this.setState({oddFormat: 'd'})
      } else {
        this.setState({oddFormat: 'f'})
      }
    }

    render() {
      if(this.state.data) {
        const data = this.state.data.data
        const matches = data.map((match) => <Event time={match.startTime} name={match.name} id={match.eventId} key={match.eventId} pickURL={this.handleEventURL}/>)
        return(
          <div>
            <header className="app-header">
              <button type="button" aria-label="Back Button" onClick={() => history.goBack()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 0h24v24H0z"/>
                  <path fill="#fff" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
                </svg>
              </button>
              <h1 className="event-class-title">Live Football Events</h1>
              <button type="button" className="btn" onClick={(e) => this.OddsFormatToggle(e)}>Toggle Odd Format</button>
            </header>
            <Route exact path='/' render={() => (
              <main className="event-class-container">
                {matches}
              </main>
            )}/>
            <Route path={`/event/${sessionStorage.getItem('event')}`} render={() => <EventMarkets socket={this.ws} oddFormat={this.state.oddFormat} />} />
          </div>
        )
      } else if(this.state.errorWebsocketDown) {
        return (
          <div>Websocket Server is down. Make sure the docker container is running</div>
        )
      } else {
        return <div>Loading Data</div>
      }
    }
}

export default App;
