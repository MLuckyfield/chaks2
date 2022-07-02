import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student')));
  const [account,setAccount]=useState()
  useEffect(()=>{
    console.log('loading account view for '+student)
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
          <h1>ACCOUNT</h1>
          {account?
          <div class='col'>
            Plan: {account.plan} (since {account.plan?moment(account.stripe.plan_start_date).format('dddd, MMM DD, YYYY'):''})
            {account.plan?<span>Pause | Cancel</span>:''}
            Points: {account.points}
          </div>
        :'Loading account...'}
      </div>
)
}

export default Account;
