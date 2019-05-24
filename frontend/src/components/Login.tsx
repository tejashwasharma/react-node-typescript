import React from 'react';
import axios from 'axios';


export default class Login extends React.Component{

  state = {
    username: '',
    password: ''
  }

  checkName = (e: { target: { value: string; }; }) => {
    this.setState({
      username: e.target.value
    });
  };

  checkPass = (e: { target: { value: string; }; }) => {
    this.setState({
      password: e.target.value
    });
  };

  submit = () => {
    if(/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(this.state.username) && /^\S+$/.test(this.state.password)){
      axios.post('http://localhost:8000/login', this.state)
    }
    else if(!(/^[a-zA-Z]+[a-zA-Z0-9]+$/.test(this.state.username))){
      alert("username incorrect")
    }
    else{

      alert("password incorrect")
    }
  };

  clear = () => {
    this.setState({
      username: '',
      password: ''
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
              Username :
            </td>
            <td>
              <input placeholder='username' value={ this.state.username} onChange={this.checkName} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              Password :
            </td>
            <td>
              <input placeholder='password' value={ this.state.password} onChange={this.checkPass} type='text'/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" value="submit" onClick={this.submit} />&nbsp;&nbsp;
            </td>
            <td>
              <input type="submit" value="clear" onClick={this.clear} />&nbsp;&nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )};
}