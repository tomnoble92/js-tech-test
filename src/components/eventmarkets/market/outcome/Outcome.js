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
        let client
        const promise = new Promise((resolve) => {
            client = new WebSocket('ws://localhost:8889/', 'echo-protocol')
            client.onopen = () => {
              resolve(client)
            }
          })
      
          promise.then(() => {
                client.send(JSON.stringify({ type: "getOutcome", id: this.props.outcomeId }))
                client.onmessage = (e) => {
                    const data = JSON.parse(e.data)
                    if(data.type !== "INIT") {
                      this.setState({outcomeData:data})
                    }
                }
        }).catch(e => {
            console.log(e)
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