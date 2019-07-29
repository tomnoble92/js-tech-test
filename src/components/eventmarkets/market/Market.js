import React from 'react';
import Outcome from './outcome/Outcome'
import './market.css'

class Market extends React.Component {

  constructor() {
    super()
    this.state = {
      outcomes: []
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
          client.send(JSON.stringify({ type: "getMarket", id: this.props.marketId }))
          client.onmessage = (e) => {
              const data = JSON.parse(e.data)
              if(data.type !== "INIT") {
                this.setState({marketData:data})
              }
          }
  }).catch(e => {
      console.log(e)
    })
  }
  render() {
    if(this.state.marketData) {
      const outcomes = this.state.marketData.data.outcomes.map((outcome) => <Outcome outcomeId={outcome} key={outcome} />)
      return (
        <div className="market">
          <button>
            {this.state.marketData.data.name}
          </button>
          <div>
            {outcomes}
          </div>
      </div>
      )
    } else return null
    
    //const outcomes = this.state.outcomes.map((outcome) => <Outcome key={outcome.data.outcomeId} outcomeData={outcome} />)
    
  }
}

export default Market;

