import NavBar from './NavBar'
import PopMenu from './PopMenu'
import { useState } from 'react'


const TopBar = () => {
   const [showPopMenu, setShowPopMenu] = useState(false)

   return (
      <div>
         <NavBar onClick={() => {setShowPopMenu(!showPopMenu); console.log(showPopMenu)}}/> 
         {showPopMenu && <PopMenu />}
      </div>
   )
}

export default TopBar

