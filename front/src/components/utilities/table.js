import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {Redirect} from 'react-router-dom';

const Table = (props)=> {

  const [target, setTarget] = useState(null);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    if(data==null){
      axios.get(props.api, {params:{filter:props.filter,fields:props.fields}})
        .then((res) => {
            console.log(res.data.data)
            setData(res.data.data);
          })
        .catch(error => console.log("error"+error))
    }
    if(target!==null){
      localStorage.setItem('student',target)
      return <Redirect to='/student'/>
    }
  },[target])

  return (
    <div class='master-row'>
      <h1>{props.name}</h1>
      <div class='row'>
        <table>

          {data ? (data.map(function(item, i){
              if(i==0){
                return (
                    <tr>
                      {Object.keys(item).map((key, y) => {
                            return <th>{key}</th>
                      })}
                    </tr>
                )
              }
              //console.log('item is: '+JSON.stringify(item.slice(1)))
              return (
                <tr onClick={setTarget(item)}>
                  {Object.keys(item).map((key, y) => {
                    return <td>{item[key]}</td>
                  })}
                  </tr>

                )

                  })): 'No data to display'}
        </table>
      </div>
      <div class='row'>

      </div>
    </div>
  )

}

export default Table;
