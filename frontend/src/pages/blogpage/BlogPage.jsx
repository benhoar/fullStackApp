import Header from '../../components/blog/Header'
import Blogs from '../../components/blog/Blogs'
import './blogpage.css'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { useData } from '../../context/DataContext'
import { useVisibility } from '../../context/VisibilityContext'
import { FaPizzaSlice } from 'react-icons/fa'
import BlogForm from '../../components/blog/BlogForm'
import ViewSlider from '../../components/viewslider/ViewSlider'
//import BlogsHandler from '../../scripts/BlogsHandler'

const BlogPage = () => {
  const { privateData, publicData } = useData()
  const { publicView, togglePublicView } = useVisibility()
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [formType, setFormType] = useState()
  const [publicBlogs, setPublicBlogs] = useState([])
  const [privateBlogs, setPrivateBlogs] = useState([])
  const [curData, setCurData] = useState({})
  const [amEditing, setAmEditing] = useState(false)
  const [sortKey, setSortKey] = useState("Newest")
  const [blogIndex, setBlogIndex] = useState(0)
  const { user } = useAuthContext()

  // Get Blogs
  useEffect(() => {
    const getBlogs = (source, type) => {
      const blogs = []
      Object.keys(source).forEach((cuisine) => {
        let cur_blogs = source[cuisine].blogs
        cur_blogs = cur_blogs.map((blog) => {
          blog.cuisine = cuisine
          if (type === 'private') {
            blog.user_id = source[cuisine].user
            blog.cuisine_id = source[cuisine]._id
          }
          return blog
        })
        blogs.push(...cur_blogs)
      })
      return blogs
    }
    if (user && Object.keys(privateData).length !== 0) {
      setPrivateBlogs(getBlogs(privateData, 'private'))
    } 
    if (Object.keys(publicData).length !== 0) {
      setPublicBlogs(getBlogs(publicData, 'public'))
    }
  }, [privateData, publicData, user])

  // Update form type and data for edit vs add blog
  useEffect(() => {
    if (amEditing) {
      setFormType(<BlogForm blogData={curData} isEdit={true} setShowAddBlog={setShowAddBlog} setCurData={setCurData}/>)
    }
    else {
      setFormType(<BlogForm setShowAddBlog={setShowAddBlog}/>)
    }
  }, [curData, amEditing])

  useEffect(() => {
    setBlogIndex(0)
  }, [publicView])

  // Sorting options for user
  const getSortKeys = () => {
    const keys = ["Newest", "Oldest", "Name A-Z", "Name Z-A", "Cuisine A-Z", "Cuisine Z-A", "Weakest", "Strongest"]
    const options = []
    for (let i = 0; i < keys.length; i++) {
      options.push(<option key={keys[i]}>
                    {keys[i]}
                   </option>)
    }
    return options
  }

  const pizzaClick = (direction) => {
    let val = blogIndex + direction
    const numBlogs = publicView ? publicBlogs.length : privateBlogs.length
    val = Math.min(val, Math.ceil(numBlogs/15)-1)
    val = Math.max(val, 0)
    setBlogIndex(val)
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
      
      <div className="containSelectors">
          <ViewSlider publicView={publicView} sliderClick={togglePublicView}/>
          <div>
            <label htmlFor="sortKeys" style={{marginRight:"5px"}}>Sort Blogs</label>
            <select name="sortKeys"
                    className="sortKeySelector"
                    autoComplete="off"
                    onChange={(e) => setSortKey(e.target.value)}
            >
              {getSortKeys()}
            </select>
          </div>
      </div>
      <Blogs blogs={publicView ? publicBlogs : privateBlogs} 
            setAmEditing={setAmEditing} 
            setShowAddBlog={setShowAddBlog} 
            setCurData={setCurData}
            sortKey={sortKey}
            blogIndex={blogIndex}
      />
      <div className="pageSlider">
        <FaPizzaSlice size={20} style={{transform:"rotate(45deg)", cursor:"pointer"}} onClick={() => pizzaClick(-1)}/>
        <p>{blogIndex + 1}</p>
        <FaPizzaSlice size={20} style={{transform:"rotate(225deg)", cursor:"pointer"}} onClick={() => pizzaClick(1)}/>
      </div>
    </div>
  )
}

export default BlogPage