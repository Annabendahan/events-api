import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';
import Auth from './modules/Auth';
import EventList from './components/EventList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AddEventForm from './components/AddEventForm';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      //shouldGoToDash: false,
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    //this.handleLogout = this.handleLogout.bind(this);
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault();
    console.log(data);
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data,
      }),
      headers: {
        'Content-Type': 'application/json',
       }
      }).then(res => res.json() )
        .then(res => {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            //shouldGoToDash: true,
          });

        }).catch(err=> {
          console.log(err);
        })
  }


   handleLoginSubmit(e, data) {
    e.preventDefault();
    console.log(data);
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
       }
      }).then(res => res.json() )
        .then(res => {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            //shouldGoToDash: true,
          });

        }).catch(err=> {
          console.log(err);
        })
  }

  handleLogout(e) {
     fetch('/logout', {
      method: 'DELETE',
      headers: {
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
    }
      }).then(res => res.json() )
        .then(res => {
          Auth.deauthenticateUser();
          this.setState({
            auth: Auth.isUserAuthenticated(),
            //shouldGoToDash: true,
          });

        }).catch(err=> {
          console.log(err);
        })
  }




  render() {
    return (
      <Router>
        <div className="App">
        <div className="nav">
          <Link to="/events"> Events </Link>

          {(this.state.auth)
            ? <span> <Link to="/dashboard"> Dashboard </Link>
              <button onClick={() => this.handleLogout()}> Logout </button> </span>
            : <span> <Link to="/login"> Login </Link>
              <Link to="/register"> Register </Link> </span>
            }
        </div>

          <Route
            exact path="/events"
            render={() => <EventList />} />
          <Route
            exact path="/register"
            render={() => (this.state.auth)
              ? <Redirect to="/dashboard" />
              : <RegisterForm
              handleRegisterSubmit= {this.handleRegisterSubmit} />} />
          <Route
            exact path="/login"
            render={() =>  (this.state.auth)
              ? <Redirect to="/dashboard" />
              : <LoginForm handleLoginSubmit= {this.handleLoginSubmit}   />} />
          <Route
              exact path="/dashboard"
              render={() => <Dashboard />} />
          <Route
            exact path="/add"
            render={() => <AddEventForm /> } />
        </div>

      </Router>
    );
  }
}

export default App;
