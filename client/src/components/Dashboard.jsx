import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';

import Auth from '../modules/Auth';
import AddEventForm from './AddEventForm';


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      myEvents: [],
      eventsLoaded: false
    }
  }

componentDidMount() {
  this.getUserEvents();
}

getUserEvents() {
  fetch('/profile', {
    method: 'GET',
    headers: {
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
    }
    }).then(res => res.json())
      .then(res => {
        this.setState({
          myEvents: res.events,
          eventsLoaded: true
        })
      }).catch(err=> console.log(err))
}


 addEvent(e, data) {
    e.preventDefault();
    fetch('/events', {
      method: 'POST',
      body: JSON.stringify({
        event: data,
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
      },
    }).then(res => res.json() )
        .then(res => {
         this.getUserEvents();
        }).catch(err=> {
          console.log(err);
        })
  }

render() {
  return(
      <div className="dash">
      <Link to="/add"> Create event </Link>
      {(this.state.eventsLoaded)
        ? this.state.myEvents.map(event => {
          return <h3 key={event.id}> {event.title} </h3>
        })
        : <p> Loading </p> }
      </div>

    )
}
}



export default Dashboard;
