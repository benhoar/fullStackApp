import './navbar.css'

const PopMenu = () => {
  return (
      <ul className="drop-menu">
         <li className="menu-item"><a href="/about">About</a></li>
         <li className="menu-item"><a href="/blogs">Blogs</a></li>
         <li className="menu-item"><a href="/summary">Dashboard</a></li>
      </ul>
    
  )
}

export default PopMenu