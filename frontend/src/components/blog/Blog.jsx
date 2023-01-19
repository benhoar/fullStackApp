import { FaTimes, FaEdit } from 'react-icons/fa'
import './blog.css'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { deleteBlog } from '../../scripts/blogScripts/deleteBlog'
import { updateBlogDependants } from '../../scripts/blogScripts/updateBlogDependants'

const Blog = ({ blog, setCurData, setAmEditing, setShowAddBlog, setBlogUpdated }) => {

  const { user } = useAuthContext()

  return (
    <div className="blog">
      <div className="restaurant">
        <h3>
          {`${blog.restaurant} (${blog.cuisine}) – ${blog.rating}/10`}
        </h3>
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
                      await updateBlogDependants(blog.cuisine, blog.cuisine_id, user) 
                      setBlogUpdated(true)
                  }}
          />
        </div>
      </div>
      <p>{`${blog.blog}
           ${new Date(blog.date).toDateString()}`}
      </p>
    </div>
  )
}

export default Blog