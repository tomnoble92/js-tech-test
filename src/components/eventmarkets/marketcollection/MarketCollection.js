import React from 'react';
import Market from '../market/Market'


class MarketCollection extends React.Component {
    constructor() {
        super() 
        this.state = {
            marketArray: [],
        }
    }

    parseData(m) {
        const data = JSON.parse(m.data)
        if(data.type === "MARKET_DATA") {
            const array = this.state.marketArray.concat(data)
            this.setState({marketArray: array})
        }
    }

    componentDidMount() {  
        const ids = this.props.marketIds
        const sliceIds = ids.slice(0,10)
        sliceIds.forEach(id => {
            this.props.socket.send(JSON.stringify({type: "getMarket",  id: id }))
        })
        this.props.socket.onmessage = (m) => this.parseData(m)
    }
    
    render() {
        if(this.state.marketArray) {
            const sortedMarkets = this.state.marketArray.sort((a,b) => {
                return a.data.displayOrder - b.data.displayOrder
            })
            const markets = sortedMarkets.map((market) => 
            <Market 
                marketData={market} 
                key={market.data.marketId} 
                order={market.data.displayOrder} 
                socket={this.props.socket} 
                oddFormat={this.props.oddFormat} 
            />)
            return (
                <div>{markets}</div>
            )
        } else return null
       
        
        
    }
}

export default MarketCollection