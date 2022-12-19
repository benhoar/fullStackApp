import { FaTimes, FaEdit } from 'react-icons/fa'
import './blog.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Blog = ({ blog, onUpdate }) => {

  const navigate = useNavigate()

  const onDelete = async () => {
    await axios.get(`/api/cuisines/${blog.cuisine_id}`)
      .then(async function(res) {
        const newScoreSum = res.data.scoreSum - blog.rating
        const newSpotsVisited = res.data.spotsVisited - 1
        if (newSpotsVisited === 0) {
          await axios.delete(`/api/cuisines/${blog.cuisine_id}`)
            .catch(() => console.log("failed cuisine delete"))
        }
        else {
          const newAllScores = res.data.allScores
          newAllScores[blog.rating] -= 1
          const newBlogs = res.data.blogs
          let newTopSpot = null
          let newTopSpotScore = 0
          let blogIndex = 0
          for (let i = 0; i < newBlogs.length; i++) {
            const b = newBlogs[i]
            if (b.restaurant === blog.restaurant) {
              blogIndex = i
              continue
            }
            if (!newTopSpot || b.rating > newTopSpotScore) {
              newTopSpot = b.restaurant
              newTopSpotScore = b.rating
            }
          }
         newBlogs.splice(blogIndex, 1)
         await axios.put(`/api/cuisines/${blog.cuisine_id}`, {
            scoreSum: newScoreSum,
            spotsVisited: newSpotsVisited,
            blogs: newBlogs,
            allScores: newAllScores,
            topSpot: newTopSpot,
            topSpotScore: newTopSpotScore
         })
          .catch(() => console.log("update during deletion error"))
        }
      })
      onUpdate()
  }

  return (
    <div className="blog">
      <div className="restaurant">
        <h3>
          {`${blog.restaurant} (${blog.cuisine}) – ${blog.rating}/10`}
        </h3>
        <div className="icons">
          <FaEdit style={{cursor:'pointer'}} 
                  className="edit" 
                  onClick={() => navigate('/blogs/edit/', {
                    state: {
                            cuisine_id: blog.cuisine_id,
                            blog_id: blog._id,
                            cuisine: blog.cuisine
                            }
                  })}/>
          <FaTimes style={{cursor:'pointer'}}
                   onClick={async () => { await onDelete() }}
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