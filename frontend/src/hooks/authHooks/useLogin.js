import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
const axios = require('axios').default

export const useLogin = () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null) // maybe delete
   const { dispatch } = useAuthContext()

   const login = async (formData) => {
      setIsLoading(true)
      setError(null)

      const { email, password } = formData

      try {
         const res = await axios.post('/api/users/login', {
            email,
            password
         })
         // save user to local storage
         localStorage.setItem('user', JSON.stringify(res.data))
         // update the auth context
         dispatch({type: "LOGIN", payload: res.data})
         setIsLoading(false)
      } catch (e) {
         setError(String(e.response.data.message))
         setTimeout(() => {setIsLoading(false)}, 2000)
      }
   }

   return { login, isLoading, error }
}