import React from 'react'
import './outcome.css'

class Outcome extends React.Component {
    constructor() {
        super()
        this.state = {
            outcomeData: null
        }
    }

    componentDidMount() {
        this.props.socket.send(JSON.stringify({type: "getOutcome",  id: this.props.outcomeId }))
        this.props.socket.addEventListener("message", (m) => {
            const data = JSON.parse(m.data)
            if(data.data.outcomeId === this.props.outcomeId && data.type === "OUTCOME_DATA") {
                this.setState({outcomeData: data})
            }
        })
    }

    render() {
        if(this.state.outcomeData) {
            return (
                <div className="outcome">
                    <div className="outcome__name">{this.state.outcomeData.data.name}</div>
                    <div className="outcome__odds">{this.state.outcomeData.data.price.num}/{this.state.outcomeData.data.price.den}</div>
                </div>
            )
        } else return null
    }
}

export default Outcome