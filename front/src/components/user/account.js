import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const Account = useRef('');
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student')));
  const [account,setAccount]=useState()
  useEffect(()=>{
    axios.get('user/all', {params:{filter:{id:student._id},fields:'stripe'}})
      .then((res) => {
          // res.data.data.forEach((item, i) => {
          //   item['inClass']=false
          // });
          console.log(res.data.data)
          setAccount(res.data.data)
        })
      .catch(error => console.log("error"+error))
  },[])

  const onSubmit = (e) => {
  }

  return(
      <div class='row'>
        Account View
      </div>
)
}

export default Account;
