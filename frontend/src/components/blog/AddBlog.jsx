import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './blog.css'

const axios = require('axios').default

const AddBlog = ({ onClose,
                   buttontxt,
                   defCuis,
                   defBlog,
                   blogId,
                   cuisineId
                }) => {
   const [restaurant, setRestaurant] = useState(defBlog ? defBlog.restaurant : '')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState(0)
   const [blog, setBlog] = useState('')
   const [location, setLocation] = useState('')
   const [highlight, setHighlight] = useState('')

   const nav = useNavigate()

   // initialize variables for edit post
   useEffect(() => {
      const setStates = () => {
         if (defBlog && defCuis) {
            setRestaurant(defBlog.restaurant)
            setCuisine(defCuis)
            const pDate = defBlog.date.split('T')[0]
            setDate(pDate)
            setRating(defBlog.rating)
            setBlog(defBlog.blog)
            setLocation(defBlog.location)
            setHighlight(defBlog.highlight)
         }
      }
      setStates()
   }, [defCuis, defBlog])

   // reset state after blog submission
   const clearFields = () => {
      setBlog('')
      setDate('')
      setCuisine('')
      setRating('')
      setRestaurant('')
      setLocation('')
      setHighlight('')
   }

   // if called from edit page, the update behavior is unique
   const editBlogSubmit = async () => {
      let sameCuisine = true
      await axios.get(`/api/cuisines/${cuisineId}`)
         .then(async function(res) {
            sameCuisine = res.data.cuisine === cuisine ? true : false          
            const scoreDif = sameCuisine ? rating - defBlog.rating : -defBlog.rating
            const newSpotsVisited = sameCuisine ? res.data.spotsVisited : res.data.spotsVisited - 1 
            const newScoreSum = res.data.scoreSum + scoreDif
            const newBlogs = res.data.blogs
            const newAllScores = res.data.allScores
            if (scoreDif !== 0 || !sameCuisine) {
               newAllScores[defBlog.rating] -= 1
            }
            if (sameCuisine) {
               if (!(rating in newAllScores)) {
                  newAllScores[rating] = 0
               }
               newAllScores[rating] += 1 
            }
            let newTopSpotScore = 0
            let newTopSpot = null
            let blogIndex = 0
            for (let i = 0; i < newBlogs.length; i++) {
               const b = newBlogs[i]
               if (b._id === blogId) {
                  b.restaurant = restaurant
                  b.rating = sameCuisine ? rating : 0
                  b.location = location
                  b.highlight = highlight
                  b.date = date
                  b.blog = blog
                  blogIndex = i
               }
               if (!newTopSpot || b.rating >= newTopSpotScore) {
                  newTopSpot = b.restaurant
                  newTopSpotScore = b.rating
               }
            }
            if (!(sameCuisine)) {
               newBlogs.splice(blogIndex, 1)
            }
            // if the cuisine changed and it was only rep of that cuisine, delete cuisine
            if (!newSpotsVisited) {
               await axios.delete(`/api/cuisines/${cuisineId}`)
                  .catch(() => console.log("deletion error"))
            }
            // otherwise, update it
            else {
               await axios.put(`/api/cuisines/${cuisineId}`, {
                  scoreSum: newScoreSum,
                  topSpot: newTopSpot,
                  topSpotScore: newTopSpotScore,
                  blogs: newBlogs,
                  allScores: newAllScores,
                  spotsVisited: newSpotsVisited
               })
               .catch((e) => console.log(e))
            }
         })
         .catch(() => console.log("failed get"))
      return sameCuisine
   }

   // general submit from blog page
   // code duplicated in sideblog --> should look into not doing that
   const onSubmit = async (e) => {
      e.preventDefault()
      if (buttontxt === 'Update Blog') {
         const sameCuisine = await editBlogSubmit()
         if (sameCuisine) {
            nav('/blogs')
            return
         }
      }
      const outBoundData = {
         cuisine: cuisine,
         topSpot: restaurant,
         topSpotScore: rating,
         blogs: [
            {
               restaurant: restaurant,
               rating: rating,
               location: location,
               date: date,
               blog: blog
            }
         ]
      }
      if (highlight) {
         outBoundData.blogs[0].highlight = highlight 
      }
      await axios.get(`/api/cuisines/cuisine/${cuisine}`)
         .then(async function(res) {
            const blogs = res.data.blogs
            blogs.push(outBoundData.blogs[0])
            const newSpotsVisited = res.data.spotsVisited + 1
            const newScoreSum = Number(res.data.scoreSum) + Number(rating)
            const newAllScores = res.data.allScores
            if (!(rating in newAllScores)) {
               newAllScores[rating] = 0
            }
            newAllScores[rating] += 1
            const newTopSpotScore = rating >= res.data.topSpotScore ? rating : res.data.topSpotScore
            const newTopSpot = rating >= res.data.topSpotScore ? restaurant : res.data.topSpot
            await axios.put(`/api/cuisines/${res.data._id}`, {
               spotsVisited: newSpotsVisited,
               scoreSum: newScoreSum,
               allScores: newAllScores,
               topSpot: newTopSpot,
               topSpotScore: newTopSpotScore,
               blogs: blogs,
            })
               .then(() => {
                  clearFields()
               })
               .catch((e) => console.log(e))
         })
         .catch(async () => {
            await axios.post("/api/cuisines/", outBoundData)
               .then(() => {
                  clearFields()
               })
               .catch((e) => console.log(e))
         })
      if (buttontxt === 'Update Blog') {
         nav('/blogs')
      } else {
      onClose()
      }
   }

   return (
      <form className="add-form" onSubmit={onSubmit} onClose={onClose}>
         <div className="form-control">
            <p className="half-width-1">
               <label>Restaurant</label>
               <input 
                  type="text" 
                  placeholder="Input Restaurant"
                  defaultValue={defBlog ? defBlog.restaurant : ''}
                  onChange={(e) => setRestaurant(e.target.value)}   
                  required/>
            </p>
            <p className="half-width-2">
               <label>Cuisine</label>
               <input 
                  type="text" 
                  placeholder="Input Cuisine"
                  defaultValue={defCuis}
                  onChange={(e) => setCuisine(e.target.value)}   
                  required/>
            </p>
            <p className="quarter-width-1">
               <label>Location</label>
               <input 
                  type="text"
                  defaultValue={defBlog ? defBlog.location : ''}
                  placeholder="Input Location"
                  onChange={(e) => setLocation(e.target.value)}
                  required/>
            </p>
            <p className="quarter-width-2">
               <label>Highlight</label>
               <input 
                  type="text"
                  defaultValue={defBlog ? defBlog.highlight : ''}
                  placeholder="Input Highlight"
                  onChange={(e) => setHighlight(e.target.value)}
                  />
            </p>
            <p className="quarter-width-3">
               <label>Date</label>
               <input 
                  type="date"
                  defaultValue={date ? date : ''}
                  placeholder=""
                  onChange={(e) => setDate(e.target.value)}   
                  required/>
            </p>
            <p className="quarter-width-4">
               <label>Score</label>
               <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  placeholder="Rate Your Experience"
                  defaultValue={defBlog ? defBlog.rating : ''}
                  onChange={(e) => setRating(e.target.value)}   
                  required/>
            </p>
            <p className="full-width">
               <label>Blog</label>
               <textarea 
                  name="" 
                  id=""
                  placeholder=""
                  defaultValue={defBlog ? defBlog.blog : ''}
                  onChange={(e) => setBlog(e.target.value)}   
                  required/>
            </p>
            <p className="full-width">
            <input type="submit" value={buttontxt} className="button btn-block"/>
            </p>
         </div>
      </form>
   )
}

 AddBlog.defaultProps = {
    buttontxt: "Save Blog",
}

export default AddBlog