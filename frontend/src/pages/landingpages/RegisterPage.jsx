import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { useAuthContext } from '../../hooks/useAuthContext'
import './landingpage.css'

const RegisterPage = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '', 
      secret: '',
   })

   const { user } = useAuthContext() 
   const nav = useNavigate()

   useEffect(() => {
      if (user) {
         nav('/')
      }
   }, [user, nav])

   const { name, email, password, password2, secret } = formData
   const { signup, error, isLoading } = useSignup()

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      await signup(formData)
   }

   return (
      <div className="landingPage">
        <h4>welcome to...</h4>
        <h1 className="title">cuisine map!</h1>
        <form action="submit" className="loginForm" onSubmit={onSubmit}>
           <label>Full Name</label>
           <input 
              type="text"
              placeholder="Enter Name"
              value={name}
              name='name'
              onChange={onChange}
           />
           <label>Email</label>
           <input 
              type="email"
              placeholder="Enter Email"
              value={email}
              name='email'
              onChange={onChange}
           />
           <label>Password</label>
           <input 
              type="password"
              placeholder="Enter Password"
              value={password}
              name='password'
              onChange={onChange}
           />
           <label>Confirm Password</label>
           <input 
              type="password"
              placeholder="Re-Enter Password"
              value={password2}
              name='password2'
              onChange={onChange}
           />
           <label>Enter Secret</label>
           <input 
              type="password"
              placeholder="Enter Secret"
              value={secret}
              name='secret'
              onChange={onChange}
           />
           <button type="submit" value="Register" className="logIn" disabled={isLoading}>
               Register
           </button>
           {error && isLoading && 
            <div className="landingError">{error}</div>
           }
        </form>
      </div>
    )
}

export default RegisterPage

