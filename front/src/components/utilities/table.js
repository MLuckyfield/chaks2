import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {Link} from 'react-router-dom';

const Table = (props)=> {


  const [data, setData] = useState(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    axios.get(props.api, {params:{filter:props.filter,fields:props.fields}})
      .then((res) => {
          console.log(res.data.data)
          setData(res.data.data);
        })
      .catch(error => console.log("error"+error))


  },[])

  const makeComment = (item)=>{
      localStorage.setItem('student',item)
      window.location='/student';
  }
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
                <tr onClick={() => makeComment(item)}>
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
