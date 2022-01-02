import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePw = this.updatePw.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email:'',
      password:'',
      feedback:''
    }
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    })
  }
  updateEmail(e) {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    })
  }
  updatePw(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/user/new',
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(res => this.setState({feedback: res.data.message}))
      .catch(error => this.setState({feedback: error.response.data.message}));

    this.setState({
      name: '',
      email: '',
      password: '',
      feedback:''
    })
  }

  render() {
    return (

<div class='row'>
  <form class='login' onSubmit={this.onSubmit}>
          <h2>Join Now!</h2>
              <div class="form-group">
                <input value={this.state.name} onChange={this.updateName} type="text" class="form-control" placeholder="Name" required/>
              </div>
              <div class="form-group">
                <input value={this.state.email} onChange={this.updateEmail} type="email" class="form-control" placeholder="Email" required/>

              </div>
              <div class="form-group">
                <input value={this.state.password} onChange={this.updatePw} type="password" class="form-control" placeholder="Password" required/>
              </div>

              <label>{this.state.feedback}</label>

              <button type="submit" class="outline-first">Sign Up</button>


            </form>
          </div>
    )
  }
}
