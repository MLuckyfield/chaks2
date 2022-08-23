import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import File from '../utilities/file_handler'

const Admin = ()=> {


  return (
    <div class='master-row'>
        <div class='row'>
              <div class='col'>
                  <div align="center">
                      <a href="#popup" class="solid-first">Upload</a>
                  </div>
                  <div id="popup">
                    <div class='master-row'>
                      <div class='row'>
                        <File api='/material/new'/>
                      </div>
                      <div class='row'>
                        <div class='col'>
                          <a href="#" class="solid-first">Back</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="overlay" ></div>
              </div>
        </div>
    </div>


  )

}

export default Admin;
