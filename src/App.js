import React from 'react';
import Event from './components/event/Event'
import EventMarkets from './components/eventmarkets/EventMarkets'
import OddsFormatToggle from './components/oddformatselect/OddFormatSelect'
import HistoryBackButton from './components/history/HistoryBackButton'
import { Route } from "react-router-dom";
import './App.css';
import {socketPromise} from './websocket'

class App extends React.Component {
    constructor() {
      super()
      this.handleEventURL = this.handleEventURL.bind(this)
      this.oddsFormatToggle = this.oddsFormatToggle.bind(this)
      this.state = {
        data: null,
        oddFormat: 'fractional'
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

    oddsFormatToggle() {
      if(this.state.oddFormat === 'fractional') {
        this.setState({oddFormat: 'decimal'})
      } else {
        this.setState({oddFormat: 'fractional'})
      }
    }

    render() {
      if(this.state.data) {
        const data = this.state.data.data
        const matches = data.map((match) => <Event time={match.startTime} name={match.name} id={match.eventId} key={match.eventId} pickURL={this.handleEventURL}/>)
        return(
          <div>
            <header className="app-header">
              <HistoryBackButton />
              <h1 className="event-class-title">Live Football Events</h1>
              <OddsFormatToggle toggle={this.oddsFormatToggle} />
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
