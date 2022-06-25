import React, {useState,useEffect,useRef} from 'react'


const Search = (props)=>{

  // const [input, setInput] = useState()
  const search = (data,param)=> {
    console.log(param)
    return data.filter(
      (item) =>
        ['first','last'].some((parameter) =>
          item[parameter].toString().toLowerCase().includes(param)
        )
    );
  }

  return (
    <form class='login'>
        <div class="form-group">
          <input onChange={(e)=>props.function(search(props.data,e))} class="form-control" placeholder="Search..."/>
        </div>
    </form>
  )
}

export default Search;
