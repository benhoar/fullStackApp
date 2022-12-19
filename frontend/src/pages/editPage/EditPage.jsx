import AddBlog from "../../components/blog/AddBlog"
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
const axios = require('axios').default



const EditPage = () => {

   const loc = useLocation()
   const [blog, setBlog] = useState()
   useEffect(() => {
      const getBlog = async () => {
         await axios.get(`/api/cuisines/${loc.state.cuisine_id}`)
            .then(function(res) {
               let blog = null
               res.data.blogs.forEach((b) => {
                  if (b._id === loc.state.blog_id) {
                     blog = b
                     return
                  }
               })
               setBlog(blog)
            })
            .catch((e) => console.log(e))
      }
      getBlog()
   }, [loc]) 

   return (
      <div>
         <br></br>
         <AddBlog buttontxt={"Update Blog"}
                  defBlog={blog}
                  defCuis={loc.state.cuisine}
                  cuisineId={loc.state.cuisine_id}
                  blogId={loc.state.blog_id}
         />
      </div>
   )
}

export default EditPage