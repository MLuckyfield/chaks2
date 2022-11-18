import React, { useEffect, useState} from 'react';
import Signup from "../user/Signup";

const Online_Landing = () => {

  return(
    <div>
      <div class='col'>
        <div class='row'>
          <div class='col'>
            <span class="material-icons">task_alt</span><h3>test</h3>
          </div>
          <div class='col'>
            <h3>test</h3>
          </div>
        </div>
        <div class='row'>
          <div class='col'>
            <h3>test</h3>
          </div>
          <div class='col'>
            <h3>test</h3>
          </div>
        </div>
        <div class='row'>
          <div class='col'>
            <h3>test</h3>
          </div>
          <div class='col'>
            <h3>test</h3>
          </div>
        </div>
      </div>
      <div class='col'>
        <div class='col'>
          <h3>step 1</h3>
          <p>blah blah</p>
        </div>
        <div class='col'>
          <h3>step 2</h3>
          <p>blah blah</p>
        </div>
        <div class='col'>
          <h3>step 3</h3>
          <p>blah blah</p>
        </div>
      </div>
      <Signup redirect={'/online'}/>
    </div>
)
}

export default Online_Landing;
