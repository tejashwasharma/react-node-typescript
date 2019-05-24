import React, { Component } from 'react';
import axios from 'axios';

export default class Events extends Component{

  state = {
    events: []
  }

  componentWillMount() {
    this.getUsers();
  }
  getUsers = async () => {
    let res = await axios.post(`http://localhost:8000/findeventlogs`);
    let data = await res.data;
    this.setState({ events: data });
  };

  render() {
    return <div>
    <div className='container text-info' style={{textAlign : "center", fontSize: '40px'}}>
    <br/><hr/>
      Events
      <hr/>
  </div>
    <ul>
      {this.state && this.state.events? this.state.events.map((evnt: {event: string}, index: number) => <li key={index}>Log: {evnt.event}</li>): null}
    </ul>
  </div>
  }
}