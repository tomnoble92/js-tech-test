import React from 'react';
import './eventmarket.css'
import Scoreboard from './scoreboard/Scoreboard'
import MarketCollection from './marketcollection/MarketCollection'

class EventMarkets extends React.Component {
    constructor() {
        super() 
        this.state = {
            eventData: null,
            eventId: JSON.parse(sessionStorage.getItem('event')),
        }
    }

    parseData(m) {
        const data = JSON.parse(m.data)
        if(data.type === "EVENT_DATA") {
            this.setState({eventData: data})
        }
    }

    componentDidMount() {
        this.props.socket.onmessage = (m) => this.parseData(m)
        this.props.socket.send(JSON.stringify({type: "getEvent",  id: this.state.eventId }))
    }

    componentWillUnmount() {
        this.props.socket.removeEventListener("message", (m) => this.parseData(m),true)
    }

    render() {
        if(this.state.eventData) {
            const eventData = this.state.eventData.data
            return (
                <section className="page-content">
                    <header>
                         <Scoreboard teams={eventData.competitors} scores={eventData.scores} />
                    </header>
                    <div>
                        <MarketCollection marketIds={this.state.eventData.data.markets} oddFormat={this.props.oddFormat} socket={this.props.socket} />
                    </div>
                </section>
            )
        } else { return (<div>loading</div>) }
        
    }
}

export default EventMarkets;

