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
  const [formType, setFormType] = useState()
  const [blogs, setBlogs] = useState([])
  const [blogUpdated, setBlogUpdated] = useState(false)
  const [curData, setCurData] = useState({})
  const [amEditing, setAmEditing] = useState(false)
  const [sortKey, setSortKey] = useState("Newest")
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
        allBlogs.sort((a, b) =>  b.date.replaceAll(/\D/g, '') - a.date.replaceAll(/\D/g, ''))
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

  // Update form type and data for edit vs add blog
  useEffect(() => {
    if (amEditing) {
      setFormType(<BlogForm setBlogUpdated={setBlogUpdated} blogData={curData} isEdit={true} setShowAddBlog={setShowAddBlog} setCurData={setCurData}/>)
    }
    else {
      setFormType(<BlogForm setBlogUpdated={setBlogUpdated} setShowAddBlog={setShowAddBlog}/>)
    }
  }, [curData, amEditing])

  // Sorting options for user
  const getSortKeys = () => {
    const keys = ["Newest", "Oldest", "Name A-Z", "Name Z-A", "Cuisine A-Z", "Cuisine Z-A", "Weakest", "Strongest"]
    const options = []
    for (let i = 0; i < keys.length; i++) {
      options.push(<option key={keys[i]} onClick={() => {setSortKey(keys[i])}}>
                    {keys[i]}
                   </option>)
    }
    return options
  }

  return (
    <div className="blogPage">
      <Header 
        buttonAction={() => {
          setShowAddBlog(!showAddBlog)
          setAmEditing(false)
          setCurData({})
        }}
        text={showAddBlog ? 'Close' : 'Add'}
      />
      {showAddBlog && 
        formType
      }
      <div className="sortSelector">
        <label style={{marginRight:"5px"}}>Sort Blogs</label>
        <select list="sortKeys"
                className="sortKeySelector"
        >
          {getSortKeys()}
        </select>
      </div>
      <Blogs blogs={blogs} 
             setAmEditing={setAmEditing} 
             setShowAddBlog={setShowAddBlog} 
             setCurData={setCurData}
             setBlogUpdated={setBlogUpdated}
             sortKey={sortKey}
      />
    </div>
  )
}

export default BlogPage