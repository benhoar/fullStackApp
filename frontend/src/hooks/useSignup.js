import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
const axios = require('axios').default

export const useSignup = () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null) // maybe delete
   const { dispatch } = useAuthContext()

   const signup = async(formData) => {
      setIsLoading(true)
      setError(null)

      const { name, email, password, password2, secret } = formData

      try {
         const res = await axios.post('/api/users', {
            name,
            email,
            password,
            password2,
            secret
         })
         // save user to local storage
         localStorage.setItem('user', JSON.stringify(res.data))
         // update the auth context
         dispatch({type: "LOGIN", payload: res.data})
         setIsLoading(false)
      } catch (e) {
         setError(String(e.response.data.message))
         setTimeout(() => {setIsLoading(false)}, 2500)
      }
   }

   return { signup, isLoading, error }
}