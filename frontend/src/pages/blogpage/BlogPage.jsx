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
  const [blogUpdated, setBlogUpated] = useState(false)

  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/")
        setBlogs(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBlogs()
    setBlogUpated(false)
  }, [blogUpdated]) 

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`)
      setBlogUpated(true)
    } catch (err) {
      console.log(err)
    }
  }

  const hideBlog = () => {
      setShowAddBlog(false)
      setBlogUpated(true)
  }

  return (
    <div>
      <Header 
        onAdd={() => setShowAddBlog(!showAddBlog)}
        text={showAddBlog ? 'Close' : 'Add'}
      />
      {showAddBlog && <AddBlog onClose={hideBlog}/>}
      <Blogs blogs={blogs} onDelete={deleteBlog}/>
    </div>
  );
}

export default BlogPage