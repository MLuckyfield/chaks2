import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('user')));
  const [account,setAccount]=useState()

  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:student._id}}})
      .then((res) => {
          // res.data.data.forEach((item, i) => {
          //   item['inClass']=false
          // });
          console.log(res.data.data)
          setAccount(res.data.data[0])
          console.log(res.data.data[0],res.data.data[0].first)
        })
      .catch(error => console.log("error"+error))
  },[])
  const onSubmit=(e,action)=>{
    console.log(action)
    axios.post('payment/update_sub', {params:{filter:{_id:student._id},fields:'stripe plan'}})
      .then((res) => {
          console.log(res.data.data)
          setAccount(res.data.data[0])
        })
      .catch(error => console.log("error"+error))
  }
  return(
      <div class='master-row'>
          <div class='col border'>
              <h1>ACCOUNT</h1>
              {account?
              <div class='col'>
                Plan: {account.plan}  {account.plan!='standard'?moment(account.stripe.plan_start_date).format('dddd, MMM DD, YYYY'):''}<br/>
                {account.first=='M'?(account.plan=='premium'?<div class="btn" onClick={(e)=>{onSubmit(e,'upgrade')}}>Upgrade</div>:<div class="btn" onClick={(e)=>onSubmit(e,'downgrade')}>Downgrade</div>):''}
                Points: {account.points}
              </div>
            :'Loading account...'}
          </div>
      </div>
)
}

export default Account;
