import React, { Component } from 'react';
import axios from 'axios';

const DashNav = ()=> {


  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem('user','');
    window.location='/';
  }



  return (
    <div id='dashnav'>
      <a href='#' onClick={logout}><span class="material-icons">logout</span></a>
      <a href='#'><span class="material-icons">settings</span></a>
      <a href='#'><span class="material-icons">apps</span></a>
    </div>


  )

}

export default DashNav;
