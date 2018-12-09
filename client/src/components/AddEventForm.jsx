import React, { Component } from 'react';




class AddEventForm extends Component {


constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      address: ''
      //shouldGoToDash: false,
    }
    this.handleChange = this.handleChange.bind(this);

}





  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
        [name]: val,
      });
    }



render() {
      return(
      <div className="form">
        <form onSubmit=
        {(e) => this.props.addEvent(e, this.state)} >
        <input type="text" name="title" placeholder="title" value= {this.state.title} onChange={this.handleChange} />
        <input type="text" name="description" placeholder="description" value= {this.state.description} onChange={this.handleChange} />
        <input type="text" name="address" placeholder="address" value= {this.state.address} onChange={this.handleChange} />

        <input type="submit" value="Create Event" />
        </form>
      </div>
      )
    }

}










export default AddEventForm;
