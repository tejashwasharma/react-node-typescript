import React, { Component } from 'react';
import axios from 'axios';


export default class Events extends Component{
  state = {
    a: [],
    b: [],
    c: [],
    d: []
  }
  componentWillMount() {
    this.getUsers();
  }
  getUsers = async () => {
    let res = await axios.post(`http://localhost:8000/finduser`);
    let dbusers = await res.data;
    var cat_a: Array<object> =  dbusers.filter((data: { category: string; }) => {
      return data.category === "a";
    });
    var cat_b =  dbusers.filter((data: { category: string; }) => {
      return data.category === "b";
    });
    var cat_c =  dbusers.filter((data: { category: string; }) => {
      return data.category === "c";
    });
    var cat_d =  dbusers.filter((data: { category: string; }) => {
      return data.category === "d";
    });
    this.setState({
      a: cat_a,
      b: cat_b,
      c: cat_c,
      d: cat_d
    });   
  };

  render = () => {
    return <div>
    <div className='container text-info' style={{textAlign : "center", fontSize: '40px'}}>
    <br/><hr/>
        Users
      <hr/>
  </div>
  <div className="container jumbotron"  style={{fontSize: '20px'}}>
  Category A: 
    <ul>
      {this.state && this.state.a ? this.state.a.map((user: {name: String}, index: number) => <li key={index}> {user.name} </li>): null}
    </ul>
  </div>
  <div className="container jumbotron"  style={{fontSize: '20px'}}>
  Category B: 
    <ul>
      {this.state && this.state.b ? this.state.b.map((user: {name: String}, index: number) => <li key={index}> {user.name} </li>): null}
    </ul>
  </div>
  <div className="container jumbotron"  style={{fontSize: '20px'}}>
  Category C: 
    <ul>
      {this.state && this.state.c ? this.state.c.map((user: {name: String}, index: number) => <li key={index}> {user.name} </li>): null}
    </ul>
  </div>
  <div className="container jumbotron"  style={{fontSize: '20px'}}>
  Category D: 
    <ul>
      {this.state && this.state.d ? this.state.d.map((user: {name: String}, index: number) => <li key={index}> {user.name} </li>): null}
    </ul>
  </div>
  </div>
  }
}