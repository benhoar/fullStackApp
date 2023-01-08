import { useState, useEffect } from "react"
import axios from 'axios'

export const useGetTopSpot = (topSpot, user) => {

   const [topSpotInfo, setTopSpotInfo] = useState({})

   useEffect(() => {
      const getTopSpotInfo = async () => {
         await axios.get(`/api/cuisines/blog/${topSpot._id}/${topSpot.topSpot}`,
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).then((res) => {
               setTopSpotInfo(res.data)
            }
         ).catch((err) => {
               console.log(`Error: ${err}`)
            }
         )
      }
      if (user && topSpot) {
         getTopSpotInfo(topSpot)
      }
   }, [topSpot, user])

   return { topSpotInfo }
}