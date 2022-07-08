import { FaTimes } from 'react-icons/fa'
import './blog.css'

const Blog = ({ blog, onDelete }) => {
  return (
    <div className="blog">
      <div className="restaurant">
        <h3>
          {`${blog.restaurant} (${blog.cuisine}) – ${blog.rating}/10`}
        </h3>
        <FaTimes style={{cursor:'pointer'}}
        onClick={() => {onDelete(blog.id)}}/>
      </div>
      <p>{`${blog.text} ${blog.date}`}</p>
    </div>
  )
}

export default Blog