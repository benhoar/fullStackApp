import { FaTimes, FaEdit } from 'react-icons/fa'
import './blog.css'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { deleteBlog } from '../../scripts/blogScripts/deleteBlog'
import { updateBlogDependants } from '../../scripts/blogScripts/updateBlogDependants'
import { useData } from '../../context/DataContext'

const Blog = ({ blog, setCurData, setAmEditing, setShowAddBlog }) => {

  const { user } = useAuthContext()
  const { setDataUpdated } = useData()

  return (
    <div className="blog">
      <div className="restaurant">
        <div className="blogHeading">
          <div className="blogRestaurant">
            <b>{`${blog.restaurant} `}</b><em>{blog.cuisine}</em>
          </div>
          <div className="blogCuisine">
            {`${blog.location} – `} 
            <span style={{color:"#7AC252"}}>{`${blog.rating}/10`}</span>
          </div>
        </div>
        {user && user._id === blog.user_id && 
          <div className="icons">
            <FaEdit style={{cursor:'pointer'}} 
                    className="edit" 
                    onClick={() => {
                      window.scrollTo(0, 0)
                      setAmEditing(true)
                      setShowAddBlog(true)
                      setCurData(blog)
                    }}/>
            {/* Delete and update cycle here is working correctly */}
            <FaTimes style={{cursor:'pointer'}}
                    onClick={async () => { 
                        await deleteBlog(blog.cuisine_id, blog.restaurant, user)
                        setDataUpdated(prevState => !prevState)
                        await updateBlogDependants(blog.cuisine, blog.cuisine_id, user) 
                    }}
            />
          </div>
        }
      </div>
      <p className="blogText">
        {blog.blog}
        <em> {new Date(blog.date).toDateString()}</em>
      </p>
    </div>
  )
}

export default Blog