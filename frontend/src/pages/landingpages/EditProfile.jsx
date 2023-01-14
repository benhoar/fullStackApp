import { useState } from 'react'
import { useUpdateProfile } from '../../hooks/authHooks/useUpdateProfile'
import './landingpage.css'

const EditProfile = () => {
   const [formData, setFormData] = useState({
      password: '',
      password2: '', 
      password3: ''
   })

   const { password, password2, password3 } = formData
   const { editprofile, error, isLoading } = useUpdateProfile()

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      await editprofile(formData)
   }

   return (
      <div className="landingPage">
        <h1>Edit Profile</h1>
        <form action="submit" className="loginForm" onSubmit={onSubmit}>
           <label>Old Password</label>
           <input 
              type="password"
              placeholder="Enter Old Password"
              value={password}
              name='password'
              onChange={onChange}
           />
           <label>New Password</label>
           <input 
              type="password"
              placeholder="Enter Password"
              value={password2}
              name='password2'
              onChange={onChange}
           />
            <label>Confirm New Password</label>
           <input 
              type="password"
              placeholder="Re-Enter Password"
              value={password3}
              name='password3'
              onChange={onChange}
           />
           <button type="submit" value="Register" className="logIn" disabled={isLoading}>
               Submit
           </button>
           {error && isLoading && 
            <div className="landingError">{error}</div>
           }
        </form>
      </div>
    )
}

export default EditProfile

