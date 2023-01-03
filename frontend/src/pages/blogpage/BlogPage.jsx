import Header from '../../components/blog/Header'
import Blogs from '../../components/blog/Blogs'
import AddBlog from '../../components/blog/AddBlog'
import './blogpage.css'
// this is a hook called useState
import { useEffect, useState } from 'react'
const axios = require('axios').default

const BlogPage = () => {
  // state is blogs and setBlogs is used to update state
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [blogUpdated, setBlogUpdated] = useState(false)


  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/cuisines/")
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
    fetchBlogs()
    setBlogUpdated(false)
  }, [blogUpdated]) 

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