import React from 'react';
import './eventmarket.css'
import Scoreboard from './scoreboard/Scoreboard';
import Market from './market/Market'
import history from '../history'

class EventMarkets extends React.Component {
    constructor() {
        super() 
        this.state = {
            eventId: JSON.parse(sessionStorage.getItem('event')),
        }
    }

    componentDidMount() {
        this.props.socket.addEventListener("message", (m) => {
            const data = JSON.parse(m.data)
            if(data.type === "EVENT_DATA") {
                this.setState({eventData: data})
            }
        })
        this.props.socket.send(JSON.stringify({type: "getEvent",  id: this.state.eventId }))
    }



    render() {
        if(this.state.eventData) {
            const eventData = this.state.eventData.data
            const markets = eventData.markets.slice(0,10)
            const selectedMarkets = markets.map((market) => <Market marketId={market} key={market} socket={this.props.socket} />)
            return (
                <section className="page-content">
                    <header>
                        <div className="page-nav">
                            <button type="button" onClick={() => history.goBack()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
                                </svg>
                            </button>       
                            {eventData.typeName}
                        </div>
                         <Scoreboard teams={eventData.competitors} scores={eventData.scores} />
                    </header>
                    <div className="">
                        {selectedMarkets}
                    </div>
                </section>
            )
        } else { return (<div>loading</div>) }
        
    }
}

export default EventMarkets;

