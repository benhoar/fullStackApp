const axios = require('axios').default

const deleteBlog = async (cuisine_id, restaurant, user) => {
   let message = "SUCCESS"
   await axios.delete(`/api/cuisines/blog/${cuisine_id}/${restaurant}`,
      {
         headers: { 'Authorization': `Bearer ${user.token}` }
      }
   ).catch(() => {
      console.log(`Failed to delete ${restaurant}`)
      message = "FAILURE"
   })
   return message
}

export { deleteBlog }