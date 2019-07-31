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
        this.props.socket.addEventListener("message", (m) => this.parseData(m))
        this.props.socket.send(JSON.stringify({type: "getOutcome",  id: this.props.outcomeId }))
    }

    componentWillUnmount(){
        this.props.socket.removeEventListener("message", (m) => this.parseData(m))
    }

    

    render() {
        let data
        if(this.state.outcomeData) { data = this.state.outcomeData.data }
        if(data && data.status.displayable) {
            let odd
            if(this.props.oddFormat === 'f') {
                odd = data.price.num + '/' + data.price.den
            } else { odd = data.price.decimal }
            return (
                <div className="outcome">
                    <div className="outcome__name">{data.name}</div>
                    <div className="outcome__odds">
                        {odd}
                    </div>
                </div>
            )
        } else return null
    }
}

export default Outcome