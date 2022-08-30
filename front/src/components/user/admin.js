import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import File from '../utilities/file_handler'

const Admin = ()=> {


  return (
    <div class='master-row'>
        <div class='row'>
          <div class='col'>
            <File api='material/new'/>
          </div>
        </div>
    </div>


  )

}

export default Admin;
