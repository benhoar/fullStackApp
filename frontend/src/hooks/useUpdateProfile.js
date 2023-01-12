import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
const axios = require('axios').default

export const useUpdateProfile = () => {
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(null) // maybe delete
   const { user, dispatch } = useAuthContext()
   const nav = useNavigate()

   const editprofile = async(formData) => {
      setIsLoading(true)
      setError(null)

      const { password, password2, password3 } = formData

      try {
         await axios.put('/api/users/update', {
            password,
            password2,
            password3,
         },
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         })
         // update the auth context
         localStorage.removeItem('user')
         dispatch({type: "LOGOUT"})
         nav('/')
      } catch (e) {
         setError(String(e.response.data.message))
         setTimeout(() => {setIsLoading(false)}, 2500)
      }
   }

   return { editprofile, isLoading, error }
}