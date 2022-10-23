import React, { useState, useEffect ,useRef} from 'react';
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
    localStorage.setItem('student','');
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
              <img class='avatar' id='nav-logo' onClick={()=>window.location='/'} src={logo} alt="Avatar"></img>
              {user==''||user==null||user==undefined?<div class='logo-basic'>CHATSHACK</div>:''}
              {user==''||user==null||user==undefined?'':
              (<div class='col profile_display'>
              <span>Welcome {user.first}</span>
              <span>{user.role!='user'?user.role:'student'}</span></div>)}
          </div>
        </div>
        {user==''||user==null||user==undefined?(
          <ul class="nav-links">
              <li>{window.location.pathname==='/blog'?<a onClick={navSlide} href="/#concept">CONCEPT</a>:<a onClick={navSlide} href="#concept">CONCEPT</a>}</li>
              <li><a href="/products">LESSONS</a></li>
              <li><a href="/events">EVENTS</a></li>
              <li><a href="/blog">BLOG</a></li>
              <li><button class='solid-first' style={{fontSize:'13px',width:'100px'}} onClick={()=>window.location='/login'}>LOG IN</button></li>
          </ul>
        ):(
          <ul class="nav-links">
              {user.role!='user'?(<li style={{padding:'3% 7%'}}><a href='/dash'><span class="material-icons">group</span></a></li>):''}
              {user.role=='manager'?(<li style={{padding:'3% 7%'}}><a href='/manage-blog'><span class="material-icons">edit</span></a></li>):''}
              {user.role=='manager'?(<li style={{padding:'3% 7%'}}><a href='/create-event'><span class="material-icons">edit_calendar</span></a></li>):''}
              {user.role=='manager'?(<li style={{padding:'3% 7%'}}><a href='/qr-reader'><span class="material-icons">qr_code_scanner</span></a></li>):''}
              {user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/dash'><span class="material-icons">home</span></a></li>):''}
              {user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/course'><span class="material-icons">trending_up</span></a></li>):''}
              {user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/blog'><span class="material-icons">school</span></a></li>):''}
              {user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/events'><span class="material-icons">info</span></a></li>):''}
              {user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/account'><span class="material-icons">qr_code_scanner</span></a></li>):''}
              <li style={{padding:'3% 7%'}}><a href='#' onClick={logout}><span class="material-icons">logout</span></a></li>
          </ul>
        )}
        <div class="burger" onClick={navSlide}>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
  )
//{user.role=='user'?(<li style={{padding:'3% 7%'}}><a href='/reservations'><span class="material-icons">edit_calendar</span></a></li>):''}
}
export default Navbar;
