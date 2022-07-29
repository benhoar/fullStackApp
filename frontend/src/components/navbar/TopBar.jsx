import NavBar from './NavBar'
import PopMenu from './PopMenu'
import { useState } from 'react'


const TopBar = () => {
   const [showPopMenu, setShowPopMenu] = useState(false)

   return (
      <div className="topBar">
         <NavBar onClick={() => setShowPopMenu(!showPopMenu)}/> 
         {showPopMenu && <PopMenu />}
      </div>
   )
}

export default TopBar

