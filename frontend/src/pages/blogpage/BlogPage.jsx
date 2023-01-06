import Header from '../../components/blog/Header'
import Blogs from '../../components/blog/Blogs'
import AddBlog from '../../components/blog/AddBlog'
import './blogpage.css'
// this is a hook called useState
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
const axios = require('axios').default

const BlogPage = () => {
  // state is blogs and setBlogs is used to update state
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [blogUpdated, setBlogUpdated] = useState(false)
  const { user } = useAuthContext()


  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try { // BELOW GET REQUEST VERIFIED
        const res = await axios.get("/api/cuisines/", {
          headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const allBlogs = []
        res.data.forEach((cuisine) => 
          cuisine.blogs.forEach((blog) => {
            blog["cuisine"] = cuisine.cuisine
            blog["cuisine_id"] = cuisine._id
            allBlogs.push(blog)
         })
        )
        setBlogs(allBlogs)
      } catch (err) {
        console.log(err)
      }
    }
    if (user) {
      fetchBlogs()
      setBlogUpdated(false)
    }
  }, [blogUpdated, user]) 

  const hideBlog = () => {
      setShowAddBlog(false)
      setBlogUpdated(true)
  }

  return (
    <div style={{paddingTop:"20px"}}>
      <Header 
        onAdd={() => setShowAddBlog(!showAddBlog)}
        text={showAddBlog ? 'Close' : 'Add'}
      />
      {showAddBlog && <AddBlog onClose={hideBlog}/>}
      <Blogs blogs={blogs} onUpdate={() => hideBlog()}/>
    </div>
  );
}

export default BlogPage