import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Registeration from './components/Register';
import Events from './components/Events';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header navbar-brand">
          <p className="text-info"> User Management</p>
        </div>

        <div>
          <ul className="nav navbar-nav">
            <li><Link to = '/'> Home </Link> </li>
            <li><Link to = '/login'> Login </Link> </li>
            <li><Link to = '/users'> Users </Link> </li>
            <li><Link to = '/registration'> Registration </Link> </li>
            <li><Link to = '/eventlogs'> Events </Link></li>
          </ul>
        </div>
      </div>
    </nav>
        <Switch>
          <Route exact path='/' component = {Home}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/registration' component = {Registeration}/>
          <Route path = '/users' component = {Users}/>
          <Route path = '/eventlogs' component = {Events}/>
        </Switch>
      <div className="navbar-fixed-bottom text-info" style={{textAlign : "center"}}>
      <hr/><p>By Tejashwa Sharma</p>
    </div>
    </BrowserRouter>
  );
}

export default App;
