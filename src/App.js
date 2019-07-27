import React from 'react';
import Event from './components/event/Event'
import './App.css';


class App extends React.Component {
  constructor() {
    super()
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

    render() {
      if(this.state.data !== null) {
        const data = this.state.data.data
        const matches = data.map((match) => <Event data={match} key={match.eventId} />)
      return(
        <section className="event-class-container">
          <header>
            <h1 className="event-class-title">Live Football Events</h1>
          </header>
          {matches}
        </section>
      )
      } else {
        return (<div>loading</div>)
      }
      
 
      
    }
}

export default App;
