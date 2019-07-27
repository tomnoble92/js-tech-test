import React from 'react';
import Event from './components/event/Event'
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
      const promise = new Promise((resolve) => {
        client = new WebSocket('ws://localhost:8889/', 'echo-protocol')
        client.onopen = () => {
          resolve(client)
        }
      })  

      promise.then(() => {
        client.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: true}))
        client.onmessage = (e) => {
          const data = JSON.parse(e.data)
          if(data.type !== "INIT") {
            this.setState({data:data})
          }
        }
      }).catch(e => {
        console.log(e)
      })
    }

    handleEventURL(data) {
      this.setState({url: data.eventId, selectedEvent: data})
    }
    

    render() {
      if(this.state.data !== null) {
        const data = this.state.data.data
        const matches = data.map((match) => <Event data={match} key={match.eventId} pickURL={this.handleEventURL}/>)
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
          <Route path={`/event/${this.state.url}`} render={() => <div>Event Market {this.state.url}</div>} />
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
