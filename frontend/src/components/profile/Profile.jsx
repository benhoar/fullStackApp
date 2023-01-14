import './profile.css'
import { useLogout } from '../../hooks/authHooks/useLogout'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { useEffect, useState } from 'react'

const Profile = () => {

   const { user } = useAuthContext()
   const { logout } = useLogout()

   const [profile, setProfile] = useState({
      name: '',
      email: '',
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
         <div className="proButtons">
            <Link to="/">
               <button className="profileButton" onClick={() => handleClick()}>
                  Log Out
               </button>
            </Link>
            <Link to='/profile'>
               <button className="profileButton">
                  Edit Profile
               </button>
            </Link>
         </div>
      </div>
   )
}

export default Profile