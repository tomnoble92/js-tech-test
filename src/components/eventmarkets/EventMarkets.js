import React from 'react';
import './eventmarket.css'
import Scoreboard from './scoreboard/Scoreboard';

class EventMarket extends React.Component {
    constructor() {
        super() 
        this.state = {
            eventData: JSON.parse(sessionStorage.getItem('event'))
        }
    }

    render() {
        return (
            <section className="page-content">
                <header>
                     <Scoreboard 
                        teams={this.state.eventData.competitors} 
                        scores={this.state.eventData.scores} 
                    /> 
                </header>
            </section>
        )
    }
}


export default EventMarket;

