import React from 'react';
import './eventmarket.css'
import Scoreboard from './scoreboard/Scoreboard';
import Market from './market/Market'

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
            const selectedMarkets = markets.map((market) => <Market marketId={market} key={market} socket={this.props.socket} oddFormat={this.props.oddFormat} />)
            return (
                <section className="page-content">
                    <header>
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

