import AddBlog from "../../components/blog/AddBlog"
import { useState, useEffect } from 'react'
const axios = require('axios').default

const EditPage = () => {

   //const [blog, setBlog] = useState([])
   const [restaurant, setRestaurant] = useState('')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState('')
   const [blog, setBlog] = useState('')
   const [location, setLocation] = useState('')
   const [highlight, setHighlight] = useState('')
   const [postId, setPostId] = useState('')

   useEffect(() => {
      const getBlog = async () => {
         const path = window.location.href.split('/')
         const curId = path[path.length-1]
         const blog = await axios.get(`/api/blogs/${curId}`)
         setRestaurant(blog.data.restaurant)
         setCuisine(blog.data.cuisine)
         setDate(blog.data.date.split('T')[0])
         setRating(blog.data.rating)
         setLocation(blog.data.location)
         setBlog(blog.data.blog)
         setHighlight(blog.data.highlight)
         setPostId(blog.data._id)
      }
      getBlog()
   }, []) 

   return (
      <div>
         <br></br>
         <AddBlog buttontxt={"Update Blog"}
                  defRest={restaurant}
                  defCuis={cuisine}
                  defDate={date}
                  defRating={rating}
                  defBlog={blog}
                  defLocation={location}
                  defHighlight={highlight}
                  postId={postId}
         />
      </div>
   )
}

export default EditPage