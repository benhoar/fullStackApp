import './navbar.css'
import PopMenu from './PopMenu'
import { FaHamburger } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { useState } from 'react'

const NavBar = () => {
   
   const [open, setOpen] = useState(false)
   const [showPopMenu, setShowPopMenu] = useState(false)

   const menuIcon = () => {
      if (!open) {
         return <FaHamburger size={25}/>
      }
      else {
         return <CgClose size={28}/>
      }
   } 

   return (
      <div className="navWrapper">
         <div className="navbar">
            <div className="leftSide">
               <a href="/">
                  <h1 className="title">cuisine map</h1>
               </a>
               <ul className="listmenu">
                  <li><a href="/blogs">Blogs</a></li>
                  <li><a href="/summary">Summary</a></li>
                  <li><a href="/about">About</a></li>
               </ul>
            </div>
            <div id="profilePic">
               <a href="/profile">
                  <img className="propic" src="/images/BH_Pic.jpg" alt=""/>
               </a>
               <a id="username" href="/profile">Ben Hoar</a>
            </div>

            <div className="miniMenu" onClick={() => {setOpen(!open); setShowPopMenu(!showPopMenu)}}>
               {menuIcon()}
            </div>
         </div>
         {showPopMenu && <PopMenu />}
      </div>
  )
}

export default NavBar