import React, { useEffect, useRef } from 'react'
import "./Navbar.css"
import img from "../../assets/logo.png"
import searchIcon from "../../assets/search_icon.svg"
import bellIcon from "../../assets/bell_icon.svg"
import profile_img from "../../assets/profile_img.png"
import caret_icon from "../../assets/caret_icon.svg"
import { logout } from '../../firebase'

const Navbar = () => {
  const navRef = useRef()

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >=80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={img} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={searchIcon} alt="search_icon" className='icons' />
        <p>Childeren</p>
          <img src={bellIcon} alt="search_icon" className='icons' />
          <div className="navbar-profile">
           <img src={profile_img} alt="search_icon"  className='profile'/>
           <img src={caret_icon} alt="search_icon"  className='profile'/>
           <div className="dropdown">
            <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
           </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar