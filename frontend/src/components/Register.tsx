import React, { Component }  from 'react';
import axios from 'axios';

export default class Events extends Component{

  state = {
    user_id: '',
    name: '',
    address: '',
    email: '',
    role: '',
    category: ''
  }
  
  checkName = (e: { target: { value: string; }; }) => {
      this.setState({
        name: e.target.value
      });
  };

  checkID = (e: { target: { value: string; }; }) => {
      this.setState({
        user_id: e.target.value
      });
  };

  checkAddress = (e: { target: { value: string; }; }) => {
      this.setState({
        address: e.target.value
      });
  };

  checkEmail = (e: { target: { value: string; }; }) => {
      this.setState({
        email: e.target.value
      });
  };

  checkRole = (e: { target: { value: string; }; }) => {
      this.setState({
        role: e.target.value
      });
  };

  checkCategory = (e: { target: { value: string; }; }) => {
      this.setState({
        category: e.target.value
      });
  };

  submit = () => {
    if(/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(this.state.name) && /^[0-9]+$/.test(this.state.user_id) &&
    /^\S+$/.test(this.state.address) && /\S+@\S+\.\S+/.test(this.state.email) && /^[a-zA-Z]+$/.test(this.state.role)){
      axios.post('http://localhost:8000/adduser', this.state);
      alert('submitted')
    }
    else if(!(/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(this.state.name))){
      alert("incorrect format for username")
    }
    else if(!(/^[0-9]+$/.test(this.state.user_id))){
      alert("incorrect format for user_id")
    }
    else if(!(/\S+@\S+\.\S+/.test(this.state.email))){
      alert("incorrect format for email")
    }
    else if(!(/^[a-zA-Z]+$/.test(this.state.role))){
      alert("incorrect format for role")
    }
    else{
      alert("incorrect format for address")
    }
  };

  clear = () => {
    console.log(this.state.user_id);
    this.setState({
      user_id: '',
      name: '',
      email: '',
      address: '',
      role: '',
      category: '',
    });
  }

  render = () => {
    return ( 
    <div>
    <div className='container text-info' style={{textAlign : "center", fontSize: '40px'}}>
      <br/><hr/>
        Registeration
      <hr/>
    </div>
    <div className="container jumbotron"  style={{fontSize: '20px'}}>
      <table>
        <tbody>
          <tr>
            <td>
              User_id :
            </td>
            <td>
              <input placeholder='UserID' value={this.state.user_id} onChange={this.checkID} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              Name :
            </td>
            <td>
              <input placeholder='Name' value={this.state.name} onChange={this.checkName} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              Address :
            </td>
            <td>
              <input placeholder='Address' value={this.state.address} onChange={this.checkAddress} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              e-mail :
            </td>
            <td>
              <input placeholder='e-mail' value={this.state.email} onChange={this.checkEmail} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              Role :
            </td>
            <td>
              <input placeholder='Role' value={this.state.role} onChange={this.checkRole} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              Category :
            </td>
            <td>
              <select name='category' value={this.state.category} onChange={this.checkCategory}>
                <option hidden value=''> Select option </option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" value="submit" onClick={this.submit} />&nbsp;&nbsp;
            </td>
            <td>
              <input type="submit" value="clear" onClick={this.clear} />&nbsp;&nbsp;
              {this.state.user_id}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )};
}