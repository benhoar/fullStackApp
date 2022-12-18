import Blog from './Blog'
import './blog.css'

const Blogs = ({ blogs, onUpdate }) => {
   return (
      <div className="blogs">
         {blogs.map((blog) => (
            <Blog  key={blog._id} blog={blog} onUpdate={onUpdate}/>
         ))}
      </div>
   )
}

export default Blogs