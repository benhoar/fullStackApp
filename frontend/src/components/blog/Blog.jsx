import { FaTimes, FaEdit } from 'react-icons/fa'
import './blog.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getTopBlog } from '../../scripts/getTopBlog.js'
import { useAuthContext } from '../../hooks/useAuthContext'

const Blog = ({ blog, onUpdate }) => {

  const { user } = useAuthContext()
  const navigate = useNavigate()

  const onDelete = async () => {
    await axios.get(`/api/cuisines/cuisine/${blog.cuisine}`,
      {
        headers: { 'Authorization': `Bearer ${user.token}` }
      }
    ).then(async function(res) {
        const newScoreSum = res.data.scoreSum - blog.rating
        const newSpotsVisited = res.data.spotsVisited - 1
        if (newSpotsVisited === 0) {
          await axios.delete(`/api/cuisines/${blog.cuisine_id}`,
            {
              headers: { 'Authorization': `Bearer ${user.token}` }
            }
          ).catch((e) => console.log(`failed cuisine delete: ${e}`))
        }
        else {
          const newAllScores = res.data.allScores
          newAllScores[blog.rating] -= 1
          await axios.delete(`/api/cuisines/blog/${blog.cuisine_id}/${blog.restaurant}`,
            {
              headers: { 'Authorization': `Bearer ${user.token}` }
            }
          ).catch((e) => {console.log(`failed blog delete: ${e}`)})
          let newTopSpot = res.data.topSpot
          let newTopSpotScore = res.data.topSpotScore
          console.log(`Pre if: ${res.data.topSpot}, ${blog.restaurant}`)
          if (res.data.topSpot === blog.restaurant) {
            const topInfo = getTopBlog(res.data.blogs, blog.restaurant)
            newTopSpot = topInfo[0]
            newTopSpotScore = topInfo[1]
            console.log(`After if: ${topInfo}`)
          }
         await axios.put(`/api/cuisines/${blog.cuisine_id}`, 
            {
                scoreSum: newScoreSum,
                spotsVisited: newSpotsVisited,
                allScores: newAllScores,
                topSpot: newTopSpot,
                topSpotScore: newTopSpotScore
            },
            {
              headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).catch(() => console.log("update during deletion error"))
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
                            cuisine: blog.cuisine,
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