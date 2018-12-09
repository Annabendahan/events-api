

import React, {Component} from 'react';

class EventList extends Component {
  constructor() {
    super();
    this.state = {
      eventList: null,
      eventListLoaded: false
     }}


     componentDidMount() {
      fetch('/events')
      .then(res=> res.json())
      .then(res => {
        this.setState({
            eventList: res.events,
            eventListLoaded: true,
          })
      }).catch(err => console.log(err));
     }

     renderEvents() {
      return this.state.eventList.map( event =>
         (
          <div className="event" key={event.id}>
            <h2> {event.title} </h2>
            <p> {event.description} </p>
          </div>
          ))
       }

     render() {
      return (
        <div className="event-list">
          {(this.state.eventListLoaded)
            ? this.renderEvents()
            : <p> Loading </p>}
        </div>
     )}
}


export default EventList;

