import AddBlog from "../../components/blog/AddBlog"
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
const axios = require('axios').default


// Called from Blog.jsx
const EditPage = () => {

   const loc = useLocation()
   const [blog, setBlog] = useState()
   useEffect(() => {
      const getBlog = async () => {
         await axios.get(`/api/cuisines/blog/${loc.state.cuisine}/${loc.state.blog_id}`)
            .then(function(res) {
               setBlog(res.data)
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
                  getTopBlog={loc.state.getTopBlog}
         />
      </div>
   )
}

export default EditPage