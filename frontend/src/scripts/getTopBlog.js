const getTopBlog = (curBlogs) => {
   let topBlog = null
   let topScore = 0
   for (let i = 0; i < curBlogs.length; i++) {
     const cur = curBlogs[i]
     if (!topBlog || cur.rating >= topScore) {
       topBlog = cur._id
       topScore = cur.rating
     }
   }
   return [topBlog, topScore]
}

 export { getTopBlog }