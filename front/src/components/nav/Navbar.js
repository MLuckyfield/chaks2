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
              <span style={{fontSize:'13px'}}>Welcome {user.first}</span>
              <span style={{fontSize:'13px'}}>{user.role!='user'?user.role:'student'}</span></div>)}
          </div>
        </div>
        {user==''||user==null||user==undefined?(
          <ul class="nav-links">
              <li>{window.location.pathname==='/blog'?<a onClick={navSlide} href="/#concept">CONCEPT</a>:<a onClick={navSlide} href="#concept">CONCEPT</a>}</li>
              <li><a href="/#products">PRODUCTS</a></li>
              <li>{window.location.pathname==='/online'?<a onClick={navSlide} href="/">CAFE&BAR</a>:<a onClick={navSlide} href="/online">ONLINE</a>}</li>
              <li><a href="/events">EVENTS</a></li>
              <li><a href="/blog">BLOG</a></li>
              <li><button class='solid-first' style={{fontSize:'13px',width:'100px'}} onClick={()=>window.location='/login'}>LOG IN</button></li>
          </ul>
        ):(
          user.segment=='japanese'?
            <ul class="nav-links">
                <li style={{padding:'3% 3%'}}><a href='/dash'><div class='col'><span class="material-icons">home</span><span style={{fontSize:'10px'}}>HOME</span></div></a></li>
                <li style={{padding:'3% 3%'}}><a href='/account'><div class='col'><span class="material-icons">qr_code_scanner</span><span style={{fontSize:'10px'}}>ACCOUNT</span></div></a></li>
                <li style={{padding:'3% 3%'}}><a href='#' onClick={logout}><div class='col'><span class="material-icons">logout</span><span style={{fontSize:'10px'}}>LOGOUT</span></div></a></li>
            </ul>
            :
            <ul class="nav-links">
                {user.role!='user'?(<li style={{padding:'3% 3%'}}><a href='/dash'><div class='col'><span class="material-icons">group</span><span style={{fontSize:'10px'}}>STUDENTS</span></div></a></li>):''}
                {user.role=='manager'?(<li style={{padding:'3% 3%'}}></li>):''}
                {user.role=='manager'?(<li style={{padding:'3% 3%'}}></li>):''}
                {user.role=='manager'?(<li style={{padding:'3% 3%'}}><a href='/qr-reader'><div class='col'><span class="material-icons">qr_code_scanner</span><span style={{fontSize:'10px'}}>SCAN</span></div></a></li>):''}
                {user.role=='manager'?(<li style={{padding:'3% 3%'}} class='dropdown'>
                  Create
                  </li>):''}
                  <div class='dropdown-content'>
                    <a href='/manage-blog'><div class='col'><span class="material-icons">edit</span><span style={{fontSize:'10px'}}>BLOG</span></div></a>
                    <a href='/create-event'><div class='col'><span class="material-icons">celebration</span><span style={{fontSize:'10px'}}>EVENTS</span></div></a>
                  </div>
                {user.role=='user'?(<li style={{padding:'3% 3%'}}><a href='/dash'><div class='col'><span class="material-icons">home</span><span style={{fontSize:'10px'}}>HOME</span></div></a></li>):''}
                {user.role=='user'?(<li style={{padding:'3% 3%'}}><a href='/course'><div class='col'><span class="material-icons">trending_up</span><span style={{fontSize:'10px'}}>STATS</span></div></a></li>):''}
                {user.role?(<li style={{padding:'3% 3%'}}><a href='/private'><div class='col'><span class="material-icons">edit_calendar</span><span style={{fontSize:'10px'}}>ONLINE</span></div></a></li>):''}
                {user.role?(<li style={{padding:'3% 3%'}}><a href='/course_management'><div class='col'><span class="material-icons">school</span><span style={{fontSize:'10px'}}>COURSES</span></div></a></li>):''}
                {user.role=='user'?(<li style={{padding:'3% 3%'}}><a href='/events'><div class='col'><span class="material-icons">info</span><span style={{fontSize:'10px'}}>EVENTS</span></div></a></li>):''}
                {user.role=='user'?(<li style={{padding:'3% 3%'}}><a href='/account'><div class='col'><span class="material-icons">qr_code_scanner</span><span style={{fontSize:'10px'}}>ACCOUNT</span></div></a></li>):''}
                <li style={{padding:'3% 3%'}}><a href='#' onClick={logout}><div class='col'><span class="material-icons">logout</span><span style={{fontSize:'10px'}}>LOGOUT</span></div></a></li>
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
