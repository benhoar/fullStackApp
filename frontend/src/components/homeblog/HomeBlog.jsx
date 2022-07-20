import './homeblog.css'
import { FaTimes } from 'react-icons/fa'
import AddBlog from '../blog/AddBlog'

const HomeBlog = ({ onClick }) => {
  return (
    <div className="popBlog">
      <div className="blogWrapper">
         <FaTimes className="close" onClick={onClick}/>
         <AddBlog onClose={onClick}/>
      </div>
    </div>
  )
}

export default HomeBlog