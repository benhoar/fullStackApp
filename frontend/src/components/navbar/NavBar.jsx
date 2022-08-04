import './navbar.css'
import { CSSTransition } from 'react-transition-group'
import { useState } from 'react'

const NavBar = ({ onClick }) => {
   
   const [closedMenu, setClosedMenu] = useState(true)
   const [openedMenu, setOpenedMenu] = useState(false)

   return (
      <div className="navbar">
         <div className="leftSide">
            <a href="/">
               <h1 className="title">cuisine map</h1>
            </a>
            <ul className="listmenu">
               <li><a href="/about">About</a></li>
               <li><a href="/blogs">Blogs</a></li>
               <li><a href="/summary">Summary</a></li>
            </ul>
         </div>
         <div id="profilePic">
            <a href="/profile">
               <img className="propic" src="/images/BH_Pic.jpg" alt=""/>
            </a>
            <a id="username" href="/profile">Ben Hoar</a>
         </div>


         {closedMenu && <div className="hamburger" onClick={() => {onClick(); setOpenedMenu(true)}}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
         </div>} 

         <CSSTransition
            in={openedMenu}
            timeout={0}
            classNames="ex"
            unmountOnExit
            onEnter={() => setClosedMenu(false)}
            onExited={() => setClosedMenu(true)}
         >
            <div className="ex" onClick={() => {onClick(); setOpenedMenu(false)}}>
               <div className="hashone"></div>
               <div className="hashtwo"></div>
            </div>
         </CSSTransition>

      </div>
  )
}

/*  <div className="hamburger-top"></div> */

export default NavBar