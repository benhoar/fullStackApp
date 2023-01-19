import './navbar.css'
import PopMenu from './PopMenu'
import { FaHamburger } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { IoIosStats } from 'react-icons/io'

const NavBar = () => {
   
   const [open, setOpen] = useState(false)
   const [showPopMenu, setShowPopMenu] = useState(false)
   const [name, setName] = useState('')
   const { user } = useAuthContext()

   useEffect(() => {
      if (user) {
         setName(user.name.split(" ")[0])
      }
   }, [user])

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
                  {user && <li><a href="/blogs">Blogs</a></li>}
                  {user && <li><a href="/about">About</a></li>}
                  {!user && <li><a href="/about">Learn More! – Email bbhoar@gmail.com to Register!</a></li>}
               </ul>
            </div>
            {user &&
               <a id="profilePic" href="/summary">
                  <IoIosStats size={30}/>
                  <div id="username">{name}'s Dashboard</div>
               </a>
            }
            {!user &&
               <div id="profilePic">
                  <a href="/login" style={{marginRight:'15px'}}>Log In</a>
                  <a href="/register">Sign Up</a>
               </div>
            }
            <div className="miniMenu" onClick={() => {setOpen(!open); setShowPopMenu(!showPopMenu)}}>
               {menuIcon()}
            </div>
         </div>
         {showPopMenu && <PopMenu />}
      </div>
  )
}

export default NavBar