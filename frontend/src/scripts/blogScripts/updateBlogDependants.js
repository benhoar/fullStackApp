const axios = require('axios').default

const updateBlogDependants = async (cuisine, cuisine_id, user) => {

   let message = "SUCCESS"

   await axios.get(`/api/cuisines/cuisine/${cuisine}`,
      {
         headers: { 'Authorization': `Bearer ${user.token}` }
      }
   ).then(async (res) => {
      let allScores = {}
      let scoreSum = 0
      let topSpot = ""
      let topSpotScore = 0
      const blogs = res.data.blogs
      const spotsVisited = blogs.length
      if (spotsVisited === 0) {
         await axios.delete(`/api/cuisines/${cuisine_id}`,
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).catch(() => {
            message = `Failed to delete ${cuisine}`
         })
      } else { 
   
         for (let i = 0; i < blogs.length; i++) {
            const { restaurant, rating } = blogs[i]
            scoreSum += rating
            
            if (!(rating in allScores)) {
               allScores[rating] = 0
            }
            allScores[rating] += 1

            if (rating >= topSpotScore) {
               topSpot = restaurant
               topSpotScore = rating
            }
         }
         await axios.put(`/api/cuisines/${res.data._id}`, 
            {
               spotsVisited: spotsVisited,
               scoreSum: scoreSum,
               allScores: allScores,
               topSpot: topSpot,
               topSpotScore: topSpotScore,
            },
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).catch((e) => {
            console.log(e)
            message = `Error updating ${cuisine} in update dependants`
         })
      }
      if (message !== "SUCCESS") {
         return message
      }
   }).catch(() => {
      message = `Error getting ${cuisine} in top blog update or no cuisine left to update`
   })

   return message
}

export { updateBlogDependants }