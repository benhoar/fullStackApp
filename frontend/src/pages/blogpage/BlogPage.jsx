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

  const getTopSpotInfo = async (cuisine) => {
    const prev = await axios.get(`api/blogs/blog/${cuisine}`)
    const prevBlogs = prev.data
    let winner = null
    prevBlogs.forEach(blog => {
      if (!winner || blog.rating > winner.rating) {
        winner = blog
      }
    })
    return winner
  }

  const cuisineUpdate = async (id) => {
    const blog = await axios.get(`/api/blogs/${id}`, {responseType: "json"})
      .catch(() => console.log("blog error"))
    const blogData = blog.data
    const cuisine = await axios.get(`api/cuisines/cuisine/${blogData.cuisine}`)
      .catch(() => console.log("cuisine error"))
    const cuisineData = cuisine.data
    const newScoreSum = Number(cuisineData.scoreSum) - Number(blogData.rating)
    const newSpotsVisited = cuisineData.spotsVisited - 1
    if (newSpotsVisited === 0) {
      await axios.delete(`/api/cuisines/${cuisineData._id}`).catch(() => console.log("failed delete"))
      return
    }
    let newTopSpot = cuisineData.topSpot
    let newTopSpotScore = cuisineData.topSpotScore
    if (id === cuisineData.topSpot) {
      let topSpotInfo = await getTopSpotInfo(blogData.cuisine)
      console.log(topSpotInfo)
      newTopSpot = topSpotInfo._id
      newTopSpotScore = topSpotInfo.rating
    }
    const newAllScores = cuisineData.allScores
    newAllScores[blogData.rating] -= 1
    await axios.put(`api/cuisines/${cuisineData._id}`, {
       scoreSum: newScoreSum,
       spotsVisited: newSpotsVisited,
       topSpot: newTopSpot,
       topSpotScore: newTopSpotScore,
       allScores: newAllScores
    }).catch((e) => console.log(e.data))
  }

  // Delete Blog
  const deleteBlog = async (id) => {
    try {
      cuisineUpdate(id)
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