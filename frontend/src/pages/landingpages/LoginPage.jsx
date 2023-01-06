import { useEffect, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import './landingpage.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const LoginPage = () => {

   const nav = useNavigate()
   const { user } = useAuthContext()

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const { email, password } = formData
   const { login, error, isLoading } = useLogin()

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      await login(formData)
   }

   useEffect(() => {
      if (user) {
         nav('/home')
      }
   }, [user, nav])

   return (
      <div className="landingPage">
        <h4>welcome to...</h4>
        <h1 className="title">cuisine map!</h1>
        <form action="submit" className="loginForm" onSubmit={onSubmit}>
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
           <button type="submit" value="Register" className="logIn" disabled={isLoading}>
               Log In
           </button>
        </form>
        {error && isLoading && 
            <div className="landingError">{error}</div>
        }
        <div style={{paddingTop:"5px"}}>
           <a href='/register' className="register">or... register here!</a>
        </div>
      </div>
    )
}

export default LoginPage