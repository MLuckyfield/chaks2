import React, { Component } from 'react';

 const Sidebar =()=> {

  //const { user } = useAuthDataContext();
  const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div class='sidebar'>
        <div class='col'>
            Welcome {user.first}<p>
            {user.role}
        </div>
          <a href='#'>Dashboard</a>
          <a href='#'>Dashboard</a>
          <a href='#'>Dashboard</a>
      </div>
    )
  }

export default Sidebar;
