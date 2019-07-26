import React from 'react';
import './App.css';


class App extends React.Component {
  
    componentDidMount() {
      let client
      const promise = new Promise((resolve,reject) => {
        client = new WebSocket('ws://localhost:8889/', 'echo-protocol')
        client.onopen = () => {
          console.log('connected')
          resolve(client)
        }
      })  

      client.addEventListener("message", e => console.log(e.data))
        promise.then((value) => {
          client.send(JSON.stringify({type: "getLiveEvents", primaryMarkets: false}));
          console.log('promise',)
      })
    }

    render() {
      return(
        <div>Hello World</div>
      )
    }
}

export default App;
