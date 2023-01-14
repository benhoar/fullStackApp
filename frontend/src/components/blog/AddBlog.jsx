import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './blog.css'
import { getTopBlog } from '../../scripts/getTopBlog'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { getOptions, cuisines } from '../../scripts/getOptions'

const axios = require('axios').default

const AddBlog = ({ onClose,
                   buttontxt,
                   defCuis,
                   defBlog,
                   cuisineId,
                }) => {
   const [restaurant, setRestaurant] = useState('')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState(0)
   const [blog, setBlog] = useState('')
   const [location, setLocation] = useState('')
   const [highlight, setHighlight] = useState('')
   const { user } = useAuthContext()
   const [errorMessage, setErrorMessage] = useState("")

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

   const handleBlog = async (blogs, sameCuisine) => {
      const filteredBlogs = blogs.filter((blog) => blog._id !== defBlog._id)

      const newBlog = {
         _id: restaurant,
         restaurant: restaurant,
         location: location,
         highlight: highlight,
         date: date,
         rating: rating,
         blog: blog
      }
      // delete blog from current location no matter what
      await axios.delete(`/api/cuisines/blog/${cuisineId}/${defBlog.restaurant}`,
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         }
      ).catch((e) => {console.log(`failed blog delete: ${e}`)})
      if (sameCuisine) {
         // if same cuisine, let's add the new one in and use that for finding new top
         await axios.put(`/api/cuisines/blog/${cuisineId}`, {blog: newBlog},
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).catch((e) => `Error in handle blog: ${e}`)
         filteredBlogs.push(newBlog) // this NewBlog workaround is safe because newBlog has already been PUT
      }
      return getTopBlog(filteredBlogs)
   }

   // if called from edit page, the update behavior is unique
   const editBlogSubmit = async () => {
      let sameCuisine = true
      await axios.get(`/api/cuisines/cuisine/${defCuis}`,
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         }
      ).then(async (res) => {
         sameCuisine = res.data.cuisine === cuisine ? true : false          
         const scoreDif = sameCuisine ? rating - defBlog.rating : -defBlog.rating
         const newSpotsVisited = sameCuisine ? res.data.spotsVisited : res.data.spotsVisited - 1 
         const newScoreSum = res.data.scoreSum + scoreDif
         const newAllScores = res.data.allScores
         if (scoreDif !== 0 || !sameCuisine || restaurant !== defBlog.restaurant) {
            newAllScores[defBlog.rating] -= 1
         }
         if (sameCuisine) {
            if (!(rating in newAllScores)) {
               newAllScores[rating] = 0
            }
            newAllScores[rating] += 1 
         }
         const topSpotInfo = await handleBlog(res.data.blogs, sameCuisine)
         const newTopSpot = topSpotInfo[0]
         const newTopSpotScore = topSpotInfo[1]
         // if the cuisine changed and it was only rep of that cuisine, delete cuisine
         if (!newSpotsVisited) {
            await axios.delete(`/api/cuisines/${cuisineId}`,
               {
                  headers: { 'Authorization': `Bearer ${user.token}` }
               }
            ).catch(() => console.log("deletion error"))
         }
         // otherwise, update it
         else {
            await axios.put(`/api/cuisines/${cuisineId}`, 
               {
                  scoreSum: newScoreSum,
                  topSpot: newTopSpot,
                  topSpotScore: newTopSpotScore,
                  allScores: newAllScores,
                  spotsVisited: newSpotsVisited
               },
               {
                  headers: { 'Authorization': `Bearer ${user.token}` }
               }
            ).catch((e) => console.log(e))
         }
      }).catch((e) => console.log(`failed get: ${e}`))
      return sameCuisine
   }

   // general submit from blog page
   // code duplicated in sideblog --> should look into not doing that
   const onSubmit = async (e) => {
      e.preventDefault()
      if (!(cuisines.has(cuisine))) {
         setErrorMessage("Please Use Cuisine From List")
         return 
      }
      if (buttontxt === 'Update Blog') {
         const sameCuisine = await editBlogSubmit()
         // if the cuisine was not changed, we are done, otherwise pass through for updates
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
               _id: restaurant,
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
      // BELOW GET REQUEST VERIFIED
      await axios.get(`/api/cuisines/cuisine/${cuisine}`,
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         }
      ).then(async (res) => { // enter this block if cuisine exists for user
         // for some reason i am adding the blog separately, then updating the cuisine
         // BELOW VERIFIED PUT REQUEST - FOLLOW-UP UPDATE IS INCORRECT
         await axios.put(`/api/cuisines/blog/${res.data._id}`, {
            blog: outBoundData.blogs[0]
         },
         {
            headers: { 'Authorization': `Bearer ${user.token}` }
         }
         ).catch((e) => console.log(e))

         const newSpotsVisited = res.data.spotsVisited + 1
         const newScoreSum = Number(res.data.scoreSum) + Number(rating)
         const newAllScores = res.data.allScores
         if (!(rating in newAllScores)) {
            newAllScores[rating] = 0
         }
         newAllScores[rating] += 1
         const newTopSpotScore = rating >= res.data.topSpotScore ? rating : res.data.topSpotScore
         const newTopSpot = rating >= res.data.topSpotScore ? restaurant : res.data.topSpot
         // BELOW PUT REQUEST VERIFIED
         await axios.put(`/api/cuisines/${res.data._id}`, 
            {
               spotsVisited: newSpotsVisited,
               scoreSum: newScoreSum,
               allScores: newAllScores,
               topSpot: newTopSpot,
               topSpotScore: newTopSpotScore,
            },
            {
               headers: { 'Authorization': `Bearer ${user.token}` }
            }
         ).then(() => 
            clearFields()
         ).catch((e) => console.log(e))
      }).catch(async () => { // Enter if first post about cuisine from user
         // POST request verified
         await axios.post("/api/cuisines/", outBoundData, {
            headers: { 'Authorization': `Bearer ${user.token}` }
         })
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
            <div className="half-width-1">
               <label>Restaurant</label>
               <input 
                  type="text" 
                  placeholder="Input Restaurant"
                  defaultValue={defBlog ? defBlog.restaurant : ''}
                  onChange={(e) => setRestaurant(e.target.value)}   
                  required/>
            </div>
            <div className="half-width-2">
               <label>Cuisine</label>
               <input 
                  list="cuisinesInput" 
                  placeholder="Input Cuisine"
                  defaultValue={defCuis}
                  onChange={(e) => setCuisine(e.target.value)}   
                  required
               />
                  <datalist id="cuisinesInput">
                     {getOptions()}
                  </datalist>
            </div>
            <div className="quarter-width-1">
               <label>Location</label>
               <input 
                  type="text"
                  defaultValue={defBlog ? defBlog.location : ''}
                  placeholder="Input Location"
                  onChange={(e) => setLocation(e.target.value)}
                  required/>
            </div>
            <div className="quarter-width-2">
               <label>Highlight</label>
               <input 
                  type="text"
                  defaultValue={defBlog ? defBlog.highlight : ''}
                  placeholder="Input Highlight"
                  onChange={(e) => setHighlight(e.target.value)}
                  />
            </div>
            <div className="quarter-width-3">
               <label>Date</label>
               <input 
                  type="date"
                  defaultValue={date ? date : ''}
                  placeholder=""
                  onChange={(e) => setDate(e.target.value)}   
                  required/>
            </div>
            <div className="quarter-width-4">
               <label>Score</label>
               <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  placeholder="Rate Your Experience"
                  defaultValue={defBlog ? defBlog.rating : ''}
                  onChange={(e) => setRating(e.target.value)}   
                  required/>
            </div>
            <div className="full-width">
               <label>Blog</label>
               <textarea 
                  name="" 
                  id=""
                  placeholder=""
                  defaultValue={defBlog ? defBlog.blog : ''}
                  onChange={(e) => setBlog(e.target.value)}   
                  required/>
            </div>
            <div className="full-width">
            <input type="submit" value={buttontxt} className="button btn-block" disabled={!user}/>
            </div>
         </div>
         {errorMessage.length !== 0 && 
            <div className="errorBlog">
               {errorMessage}
            </div>
         }
      </form>
   )
}

 AddBlog.defaultProps = {
    buttontxt: "Save Blog",
}

export default AddBlog