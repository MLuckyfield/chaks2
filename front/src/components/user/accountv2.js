import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import {getCurrentUser} from '../../utilities/helpers'
import QRCode from 'react-qr-code'
import {io} from 'socket.io-client';
const socket=io()

const Account = () => {

  const [user,setUser] = useState()

  useEffect(()=>{
    axios.get('/user/all',{params:{filter:{_id:getCurrentUser()._id}}})
      .then((res) => {
          setUser(res.data.data[0])
          })
      .catch((err) => {
        console.log(err);
        })
  },[])
  return (
    <div>
      <div class='row'>Next party on XX!</div>
      <div class='row'>We will be closed on XX!</div>

    </div>
  )
}

export default Account;
