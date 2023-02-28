import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuthContext } from '../hooks/authHooks/useAuthContext'
const axios = require('axios').default

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {

   // probably should figure out another solution here, 
   // the api calls are happening a ton due to the set up
   // of the user context, so downstream components that use
   // these data sources need to wait for the user context to stabilize until
   // they can, which results in many re-renders in context consumers
   const [publicData, setPublicData] = useState({})
   const [privateData, setPrivateData] = useState({})
   const { user } = useAuthContext()

   const merge = useCallback((host, guest) => {
      host.spotsVisited += guest.spotsVisited
      host.scoreSum += guest.scoreSum
      for (const score in guest.allScores) {
         if (!(score in host.allScores)) {
            host.allScores[score] = 0
         }
         host.allScores[score] += guest.allScores[score]
      }
      host.blogs.push(...guest.blogs)
   }, [])

   // get user data
   useEffect(() => {
      const getPrivateData = async () => {
         try {
            const my_headers = {headers: { 'Authorization': `Bearer ${user.token}` }}
            const res = await axios.get("/api/cuisines/", my_headers)
            const private_data = {}
            res.data.forEach((datum) => {
               datum.blogs.sort((a, b) => b.rating - a.rating)
               private_data[datum.cuisine] = datum
            })
            setPrivateData(private_data)
         } catch (e) {
            console.log(`Private Data Error: ${e}`)
         }
      }
      if (user) {
         getPrivateData()
      }
   }, [user])

   // get public data
   useEffect(() => {
      const getPublicData = async (token) => {
         try {
            const res = await axios.get(`/api/cuisines/public/${token}`)
            const public_data = {}
            if (res.data) {
               res.data.forEach((datum) => {
                  if (datum.cuisine in public_data) {
                     merge(public_data[datum.cuisine], datum)
                  } else {
                     public_data[datum.cuisine] = datum
                  }
               })
               for (const cuisine in public_data) {
                  public_data[cuisine].blogs.sort((a, b) => b.rating - a.rating)
               }
               setPublicData(public_data)
            }
         } catch (e) {
            console.log(`Public Data Error: ${e}`)
         }
      }
      // workaround, investigate why using ternary with user context value for "user" can't se token
      const curUser = localStorage.getItem('user')
      let token
      if (curUser) {
         token = JSON.parse(curUser).token
      } else {
         token = "0000"
      }
      getPublicData(token)
   }, [merge, user])
 
   return (
      <DataContext.Provider value={{privateData, publicData}}>
            { children }
      </DataContext.Provider>
   )
}