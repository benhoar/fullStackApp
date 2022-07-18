import { FaTimes, FaEdit } from 'react-icons/fa'
import './blog.css'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onDelete }) => {
  return (
    <div className="blog">
      <div className="restaurant">
        <h3>
          {`${blog.restaurant} (${blog.cuisine}) – ${blog.rating}/10`}
        </h3>
        <div className="icons">
          <Link to={`/blogs/edit/${blog._id}`} className="link">
            <FaEdit style={{cursor:'pointer'}} className="edit"/>
          </Link>
          <FaTimes style={{cursor:'pointer'}}
          onClick={() => {onDelete(blog._id)}}/>
        </div>
      </div>
      <p>{`${blog.blog}
           ${new Date(blog.date).toDateString()}`}
      </p>
    </div>
  )
}

export default Blog