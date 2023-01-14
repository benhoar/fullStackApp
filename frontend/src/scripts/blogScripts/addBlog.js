const axios = require('axios').default

const addBlog = async (blogData, user) => {

   const { restaurant, cuisine, rating } = blogData
   blogData._id = restaurant
   let message = "SUCCESS"

   // I SHOULD UPDATE THIS SO THAT A FAILED GET REQUEST DOESN'T OVERWRITE AN EXISTING CUISINE
   // IN CASE THE FAILURE WAS NOT DUE TO LACK OF CUISINE IN DB

   await axios.get(`/api/cuisines/cuisine/${cuisine}`,
      {
         headers: { 'Authorization': `Bearer ${user.token}` }
      }
   ).then(async (res) => { // enter this block if cuisine exists for user
      const newSpotsVisited = res.data.spotsVisited + 1
      const newScoreSum = Number(res.data.scoreSum) + Number(rating)
      const newAllScores = res.data.allScores
      if (!(rating in newAllScores)) {
         newAllScores[rating] = 0
      }
      newAllScores[rating] += 1
      let newTopSpotScore = res.data.topSpotScore
      let newTopSpot = res.data.topSpot
      if (rating >= res.data.topSpotScore) {
         newTopSpotScore = rating
         newTopSpot = restaurant
      }

      for (let i = 0; i < res.data.blogs.length; i++) {
         if (res.data.blogs[i]._id === restaurant) {
            message = "Repeated Restaurant"
            return
         } 
      }

      await axios.put(`/api/cuisines/${res.data._id}`, 
         {
            spotsVisited: newSpotsVisited,
            scoreSum: newScoreSum,
            allScores: newAllScores,
            topSpot: newTopSpot,
            topSpotScore: newTopSpotScore,
            blogs: [...res.data.blogs, blogData]
         },
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         }
      ).catch(() => {
         message = `Error adding ${blogData.restaurant} to ${blogData.cuisine}}`
      })
      if (message !== "SUCCESS") {
         return 
      }
   }).catch(async () => { // Enter if first post about cuisine from user
      await axios.post("/api/cuisines/", 
         {
            cuisine: cuisine,
            topSpot: restaurant,
            topSpotScore: rating,
            blogs: [blogData],
         }, {
         headers: { 'Authorization': `Bearer ${user.token}` }
      }).catch(() => {
         message = `Error Initializing ${blogData.cuisine}}`
      })
   })
   return message
}

export { addBlog }