import Blog from './Blog'
import './blog.css'

const Blogs = ({ blogs, onUpdate, getTopBlog }) => {

   return (
      <div className="blogs">
         {blogs.map((blog) => (
            <Blog  key={blog._id} blog={blog} onUpdate={onUpdate} getTopBlog={getTopBlog}/>
         ))}
      </div>
   )
}

export default Blogs