import './navbar.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const PopMenu = () => {
  const { user } = useAuthContext()
  return (
    <div className="">
      {user &&
        <ul className="drop-menu">
          <li className="menu-item"><a href="/about">About</a></li>
          <li className="menu-item"><a href="/blogs">Blogs</a></li>
          <li className="menu-item"><a href="/summary">Dashboard</a></li>
        </ul>
      }
      {!user && 
        <ul className="drop-menu">
          <li className="menu-item"><a href="/about">About</a></li>
          <li className="menu-item"><a href="/login">Log in</a></li>
          <li className="menu-item"><a href="/register">Register</a></li>
        </ul>
      }
    </div>
  )
}

export default PopMenu