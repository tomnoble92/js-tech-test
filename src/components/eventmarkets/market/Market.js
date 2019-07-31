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
          <button onClick={(e) => this.handleClick(e)} className="market-accordion__header">
            {this.props.marketData.data.name}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
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

