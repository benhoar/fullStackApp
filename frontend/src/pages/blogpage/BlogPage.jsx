import Header from '../../components/blog/Header'
import Blogs from '../../components/blog/Blogs'
import './blogpage.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import BlogForm from '../../components/blog/BlogForm'
const axios = require('axios').default

const BlogPage = () => {
  // state is blogs and setBlogs is used to update state
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [blogUpdated, setBlogUpdated] = useState(false)
  const [curData, setCurData] = useState({})
  const [amEditing, setAmEditing] = useState(false)
  const { user } = useAuthContext()

  // Get Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try { // BELOW GET REQUEST VERIFIED
        const res = await axios.get("/api/cuisines/", {
          headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const allBlogs = []
        for (let i = 0; i < res.data.length; i++) {
          const cuisine = res.data[i]
          for (let j = 0; j < cuisine.blogs.length; j++) {
            const blog = cuisine.blogs[j]
            blog["cuisine"] = cuisine.cuisine
            blog["cuisine_id"] = cuisine._id
            allBlogs.push(blog)
         }
        }
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

  // Get raw form or edit form pre-filled with user data
  const getForm = () => {
    if (amEditing) {
      return <BlogForm setBlogUpdated={setBlogUpdated} blogData={curData} isEdit={true} setShowAddBlog={setShowAddBlog}/>
    }
    else {
      return <BlogForm setBlogUpdated={setBlogUpdated} setShowAddBlog={setShowAddBlog}/>
    }
  }

  return (
    <div style={{paddingTop:"20px"}}>
      <Header 
        buttonAction={() => {
          setShowAddBlog(!showAddBlog)
          setAmEditing(false)
          setCurData({})
        }}
        text={showAddBlog ? 'Close' : 'Add'}
      />
      {showAddBlog && 
        getForm()
      }
      <Blogs blogs={blogs} 
             setAmEditing={setAmEditing} 
             setShowAddBlog={setShowAddBlog} 
             setCurData={setCurData}
             setBlogUpdated={setBlogUpdated}
      />
    </div>
  )
}

export default BlogPage