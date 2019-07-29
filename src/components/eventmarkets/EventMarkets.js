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
        let client
        const promise = new Promise((resolve) => {
            client = new WebSocket('ws://localhost:8889/', 'echo-protocol')
            client.onopen = () => {
              resolve(client)
            }
        })

        promise.then(() => {
            client.addEventListener("message", (m) => {
                const data = JSON.parse(m.data)
                if(data.type !== "INIT") {
                  this.setState({data: data})
                }
              })
              client.send(JSON.stringify({type: "getEvent",  id: this.state.eventId }))
        }).catch(e => {
            console.log(e)
          })
       
    }


    render() {
        if(this.state.data) {
            const markets = this.state.data.data.markets.slice(0,10)
            const selectedMarkets = markets.map((market) => <Market marketId={market} key={market} />)
            return (
                <section className="page-content">
                    <header>
                        <div className="page-nav">
                        </div>
                         <Scoreboard teams={this.state.data.data.competitors} scores={this.state.data.data.scores} />
                    </header>
                    <div className="">
                        {selectedMarkets}
                    </div>
                </section>
            )
        } else return null
        
    }
}


export default EventMarkets;

