import React from 'react';
import Outcome from './outcome/Outcome'
import './market.css'

class Market extends React.Component {

  constructor() {
    super()
    this.state = {
      marketData: null
    }
  }


  componentDidMount() {
      this.props.socket.send(JSON.stringify({type: "getMarket",  id: this.props.marketId }))
      this.props.socket.addEventListener("message", (m) => {
          const data = JSON.parse(m.data)
          if(data.data.marketId === this.props.marketId && data.type === "MARKET_DATA" ) {
            this.setState({marketData: data})
          }
      })
  }

  handleClick(e) {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  render() {
    if(this.state.marketData) {
      const outcomes = this.state.marketData.data.outcomes.map((outcome) => <Outcome outcomeId={outcome} key={outcome} socket={this.props.socket} oddFormat={this.props.oddFormat} />)
      return (
        <div className={this.state.isOpen ? "market-accordion js-open" : "market-accordion"}>
          <button onClick={(e) => this.handleClick(e)}>
            {this.state.marketData.data.name}
          </button>
          <div className="market-accordion__content">
            {outcomes}
          </div>
      </div>
      )
    } else return null    
  }
}

export default Market;

