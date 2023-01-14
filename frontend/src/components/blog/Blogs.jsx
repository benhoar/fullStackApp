import Blog from './Blog'
import './blog.css'

const Blogs = ({ blogs, setAmEditing, setShowAddBlog, setCurData, setBlogUpdated }) => {
   
   return (
      <div className="blogs">
         {blogs.map((blog, i) => (
            <Blog  key={blog._id + i} 
                   blog={blog} 
                   setAmEditing={setAmEditing}
                   setShowAddBlog={setShowAddBlog}
                   setCurData={setCurData}
                   setBlogUpdated={setBlogUpdated}
            />
         ))}
      </div>
   )
}

export default Blogs