import React from 'react'
import './outcome.css'

class Outcome extends React.Component {
    constructor() {
        super()
        this.state = {
            outcomeData: null,
        }
    }

    parseData(m) {
        const data = JSON.parse(m.data)
        if(data.data.outcomeId === this.props.outcomeId && data.type === "OUTCOME_DATA") {
            this.setState({outcomeData: data})
        }
    }

    componentDidMount() {
        this.props.socket.send(JSON.stringify({type: "getOutcome",  id: this.props.outcomeId }))
        this.props.socket.addEventListener("message", (m) => this.parseData(m))
    }

    componentWillUnmount(){
        this.props.socket.removeEventListener("message", (m) => this.parseData(m))
    }

    formatOdd(data) {
        if(data) {
           let decimal = data.data.price.decimal.toString()
           if(decimal.length > 5) {
            decimal = decimal.slice(0,6)
           }

           if(this.props.oddFormat === 'fractional') {
            return data.data.price.num + '/' + data.data.price.den
           } else {
               return decimal
           }
        }
    }

    render() {
        const oddFormatChoice = this.formatOdd(this.state.outcomeData)
        let data
        if(this.state.outcomeData) { 
            data = this.state.outcomeData.data 
        }
        if(data && data.status.displayable) {
            return (
                <div className="outcome">
                    <div className="outcome__name">{data.name}</div>
                    <div className="outcome__odds">
                        {oddFormatChoice}
                    </div>
                </div>
            )
        } else return null
    }
}

export default Outcome