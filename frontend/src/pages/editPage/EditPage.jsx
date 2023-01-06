import AddBlog from "../../components/blog/AddBlog"
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
const axios = require('axios').default


// Called from Blog.jsx
const EditPage = () => {

   const { user } = useAuthContext()
   const loc = useLocation()
   const [blog, setBlog] = useState()
   useEffect(() => {
      const getBlog = async () => {
         // BELOW GET VERIFIED
         await axios.get(`/api/cuisines/blog/${loc.state.cuisine_id}/${loc.state.blog_id}`, 
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         )
            .then(function(res) {
               setBlog(res.data)
            })
            .catch((e) => console.log(e))
      }
      getBlog()
   }, [loc, user]) 

   return (
      <div>
         <br></br>
         <AddBlog buttontxt={"Update Blog"}
                  defBlog={blog}
                  defCuis={loc.state.cuisine}
                  cuisineId={loc.state.cuisine_id}
                  blogId={loc.state.blog_id}
                  getTopBlog={loc.state.getTopBlog}
         />
      </div>
   )
}

export default EditPage