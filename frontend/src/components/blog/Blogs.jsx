import Blog from './Blog'
import { useState, useLayoutEffect, useEffect } from 'react'
import './blog.css'

const Blogs = ({ blogs, setAmEditing, setShowAddBlog, setCurData, sortKey, blogIndex }) => {
   
    const [toShow, setToShow] = useState([])
    const [visibleBlogs, setVisibleBlogs] = useState([])

    useEffect(() => {
      const sortBlogs = () => {
        let toret = []
        switch (sortKey) {
          case "Name A-Z":
            toret = [...blogs].sort((a, b) =>  (a.restaurant > b.restaurant) ? 1 : ((b.restaurant > a.restaurant) ? -1 : 0))
            return toret
          case "Name Z-A":
            toret = [...blogs].sort((a, b) =>  (b.restaurant > a.restaurant) ? 1 : ((a.restaurant > b.restaurant) ? -1 : 0))
            return toret
          case "Cuisine A-Z":
            toret = [...blogs].sort((a, b) =>  (a.cuisine > b.cuisine) ? 1 : ((b.cuisine > a.cuisine) ? -1 : 0))
            return toret
          case "Cuisine Z-A":
            toret = [...blogs].sort((a, b) =>  (b.cuisine > a.cuisine) ? 1 : ((a.cuisine > b.cuisine) ? -1 : 0))
            return toret
          case "Oldest":
            toret = [...blogs].sort((a, b) =>  a.date.replaceAll(/\D/g, '') - b.date.replaceAll(/\D/g, ''))
            return toret
          case "Weakest":
            toret = [...blogs].sort((a, b) =>  a.rating - b.rating)
            return toret
          case "Strongest":
            toret = [...blogs].sort((a, b) =>  b.rating - a.rating)
            return toret
          default:
            toret = [...blogs].sort((a, b) =>  b.date.replaceAll(/\D/g, '') - a.date.replaceAll(/\D/g, ''))
            return toret
        }
      }
      setToShow(sortBlogs())
    }, [sortKey, blogs])

    useLayoutEffect(() => {
      const cur = []
      for (let i = blogIndex*15; i < (blogIndex*15)+15 && i < toShow.length; i++) {
        const blog = toShow[i]
        cur.push(<Blog  key={blog._id + i} 
                        blog={blog} 
                        setAmEditing={setAmEditing}
                        setShowAddBlog={setShowAddBlog}
                        setCurData={setCurData}
                />)
      }
      setVisibleBlogs(cur)
    }, [blogIndex, toShow, setAmEditing, setCurData, setShowAddBlog])

   return (
      <div className="blogs">
         {visibleBlogs}
      </div>
   )
}

export default Blogs