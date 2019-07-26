import React from 'react';


class Event extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }
    componentDidMount() {
    }

    render() {
        return (<div>{this.props.data.name}</div>)
    }
}

export default Event;

