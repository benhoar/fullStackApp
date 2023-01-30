import { useState, useEffect } from "react"
import axios from 'axios'

export const useGetTopSpot = (topSpot, user, publicView) => {

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
      if (user && topSpot && !publicView) {
         getTopSpotInfo(topSpot)
      }
   }, [topSpot, user, publicView])

   return { topSpotInfo }
}