import React, { useEffect, useState} from 'react';
import Signup from "../user/Signup";

const Online_Landing = () => {

  return(
    <div>
      <Signup redirect={'/online'}/>
    </div>
)
}

export default Online_Landing;
