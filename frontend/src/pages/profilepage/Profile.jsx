import './profile.css'
import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect, useState } from 'react'

const Profile = () => {
   const pic = "images/defpic.png"

   const { user } = useAuthContext()
   const { logout } = useLogout()

   const [profile, setProfile] = useState({
      name: '',
      email: '',
      joined: ''
   })

   const handleClick = () => {
      logout()
   }

   useEffect(() => {
      const fillProfileInfo = () => {
         setProfile({
            name: user.name,
            email: user.email,
         })
      }
      if (user) {
         fillProfileInfo()
      }
   }, [user])

   return (
      <div className="fieldWrapper">
         <img id="pic" src={pic} alt="" />
         <div className="fields">
            <div className="field">
               <span className="fieldName">Name</span>
               <span>: {profile.name}</span>
            </div>
            <div className="field">
               <span className="fieldName">Email</span>
               <span>: {profile.email}</span>
            </div>
         </div>
         <Link to="/home">
            <button className="logout" onClick={() => handleClick()}>
               Log Out
            </button>
         </Link>
      </div>
   )
}

export default Profile