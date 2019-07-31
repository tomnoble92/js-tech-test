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

  handleClick(e) {
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  render() {
    if(this.props.marketData && this.props.marketData.data.status.displayable) {
      this.outcomes = this.props.marketData.data.outcomes.map((outcome) => <Outcome outcomeId={outcome} key={outcome} socket={this.props.socket} oddFormat={this.props.oddFormat} />)
      return (
        <div className={this.state.isOpen ? "market-accordion js-open" : "market-accordion"}>
          <button onClick={(e) => this.handleClick(e)}>
            {this.props.marketData.data.name}
          </button>
          <div className="market-accordion__content">
            {this.outcomes}
          </div>
      </div>
      )
    } else return null   
  }
}

export default Market;

