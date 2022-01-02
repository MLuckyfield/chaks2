import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'
import DashNav from './DashNav'

export default class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email:'',
      password:''
    }
  }


  render() {
    return (
      <div class='container'>
        <Sidebar/>
        <div id='admindash'>
            <DashNav/>
            <div className='row'>
              <div class='col'>
                hello
              </div>
              <div class='row'>
                  <div class='col'>
                    again
                  </div>
                  <div class='col'>
                    again
                  </div>
              </div>
            </div>
        </div>
      </div>



    )
  }
}
