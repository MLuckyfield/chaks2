import React, { useState, useEffect ,useRef} from 'react';
// import {useAuthDataContext} from "../auth-provider";
import logo from '../../chatshack.jpg'

const Navbar = ()=>{
  const [user, setUser] = useState()
  useEffect(()=>{
      let current = localStorage.getItem('user')
      if(current){
        setUser(JSON.parse(current))
      }
  },[])
  // const { onLogout } = useAuthDataContext();
  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem('user','');
    window.location='/';
  }
  const navSlide=()=>{
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = ""
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
    });
    //Burger Animation
    burger.classList.toggle("toggle");

  }
  return(
    <nav>
        <div class="logo">
          <div id='nav-row'>
              <img class='avatar' id='nav-logo' src={logo} alt="Avatar"></img>
              {user==''||user==null||user==undefined?<div class='logo-basic'>CHATSHACK</div>:''}
              {user==''||user==null||user==undefined?'':
              (<div class='col'>
              <span>Welcome {user.first}</span>
              <span>{user.role}</span></div>)}
          </div>
        </div>
        {user==''||user==null||user==undefined?(
          <ul class="nav-links">
              <li><a onClick={navSlide} href="#concept">CONCEPT</a></li>
              <li><a onClick={navSlide} href="#merit">MERIT</a></li>
              <li><a onClick={navSlide} href="#access">ACCESS</a></li>
              <li><a onClick={navSlide} href="#faq">FAQ</a></li>
              <li><a onClick={navSlide} href="#team">TEAM</a></li>
          </ul>
        ):(
          <ul class="nav-links">
              <li><a href='#' onClick={logout}><span class="material-icons">logout</span></a></li>
          </ul>
        )}
        <div class="burger" onClick={navSlide}>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
  )

}
export default Navbar;
