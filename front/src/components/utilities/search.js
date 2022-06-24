import React, {useState,useEffect,useRef} from 'react'


const Search = (props)=>{

  const [input, setInput] = useRef()
  const search = (data)=> {
    return data.filter(
      (data) =>
        ['first','last'].some((parameter) =>
          data[parameter].toString().toLowerCase().includes(input.current.value)
        )
    );
  }

  return (
    <form class='login'>
        <div class="form-group">
          <input ref={input} onChange={props.function(search(props.data))} class="form-control" placeholder="Search..."/>
        </div>
    </form>
  )
}

export default Search;
