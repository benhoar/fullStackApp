import Blog from './Blog'
import './blog.css'

const Blogs = ({ blogs, onDelete }) => {
   return (
      <>
         {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onDelete={onDelete}/>
         ))}
      </>
   )
}

export default Blogs