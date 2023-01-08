import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
const axios = require('axios').default

export const useGetBlogs = () => {

   const [data, setData] = useState({
      cuisines: [],
      numSpots: 0,
      allScores: {},
      fullScoreSum: 0,
   })

   const { user } = useAuthContext()

   const [error, setError] = useState(false)

   useEffect(() => {
      const getBlogData = async () => {
         try {
            const res = await axios.get("/api/cuisines",
               {
               headers: { 'Authorization': `Bearer ${user.token}` }
               }
            )
            const scores = new Array(10).fill(0)
            let totalSpots = 0
            const allCuisines = []
            let scoreSum = 0
            res.data.forEach((cuisine) => {
               allCuisines.push(cuisine)
               totalSpots += cuisine.spotsVisited
               scoreSum += cuisine.scoreSum
               Object.entries(cuisine.allScores).map(([rating, count]) => scores[rating-1] += count)
            })
            setData({
               cuisines: allCuisines,
               allScores: scores,
               numSpots: totalSpots,
               fullScoreSum: scoreSum
            })
         } catch (e) {
            setError(true)
            console.log(e)
         }
      }
      if (user) {
         getBlogData()
      }
   }, [user])

   return { data, error }
}