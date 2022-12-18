import AddBlog from "../../components/blog/AddBlog"
import { useState, useEffect } from 'react'
const axios = require('axios').default

const EditPage = () => {

   const [blog, setBlog] = useState([])
   const [ids, setIds] = useState([])

   useEffect(() => {
      const getBlog = async () => {
         const path = window.location.href.split('/')
         const ids = path[path.length-1].split('_')
         await axios.get(`/api/cuisines/${ids[0]}`)
            .then(function(res) {
               let blog = null
               res.data.blogs.forEach((b) => {
                  if (b._id === ids[1]) {
                     blog = b
                     return
                  }
               })
               setBlog(blog)
               setIds(ids)
            })
            .catch((e) => console.log(e))
      }
      getBlog()
   }, []) 

   return (
      <div>
         <br></br>
         <AddBlog buttontxt={"Update Blog"}
                  defBlog={blog}
                  defCuis={ids[2]}
                  cuisineId={ids[0]}
                  blogId={ids[1]}
         />
      </div>
   )
}

export default EditPage