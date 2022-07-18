import Blog from './Blog'
import './blog.css'

const Blogs = ({ blogs, onDelete }) => {
   return (
      <div className="blogs">
         {blogs.map((blog) => (
            <Blog  key={blog._id} blog={blog} onDelete={onDelete}/>
         ))}
      </div>
   )
}

export default Blogs