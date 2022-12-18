import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import './sideblog.css'

const axios = require('axios').default

const SideBlog = ({ onClick }) => {
   const [restaurant, setRestaurant] = useState('')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState('')
   const [blog, setBlog] = useState('')
   const [location, setLocation] = useState('')
   const [highlight, setHighlight] = useState('')

   const onSubmit = async (e) => {
      e.preventDefault()
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
            await axios.put(`api/cuisines/${res.data._id}`, {
               spotsVisited: newSpotsVisited,
               scoreSum: newScoreSum,
               allScores: newAllScores,
               topSpot: newTopSpot,
               topSpotScore: newTopSpotScore,
               blogs: blogs,
            })
               .catch(() => console.log("put error"))
         })
         .catch(async () => {
            await axios.post("/api/cuisines/", outBoundData)
               .catch((e) => console.log(e))
         })
         onClick()
   }

  return (
    <div className="sideBlogWrapper">
      <form onSubmit={onSubmit} className="sideBlog">
         <div className="inputWrap">
            <div className="twoButton">
               <label className="sideLabel">Restaurant</label>
               <FaTimes className="cancelBlog" onClick={() => onClick()}/>
            </div>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Restaurant"
               onChange={(e) => setRestaurant(e.target.value)}   
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Cuisine</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Cuisine"
               onChange={(e) => setCuisine(e.target.value)}   
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Location</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Location"
               onChange={(e) => setLocation(e.target.value)}   
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Highlight</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Highlight"
               onChange={(e) => setHighlight(e.target.value)}   
            />
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Date</label>
            <input 
               className="sideArea"
               type="Date"
               placeholder=""
               onChange={(e) => setDate(e.target.value)}   
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Score</label>
            <input 
               className="sideArea"
               type="number" 
               min="1" 
               max="10" 
               placeholder="Rate Experience"
               onChange={(e) => setRating(e.target.value)}   
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Blog</label>
            <textarea 
               className="sideArea"
               placeholder=""
               onChange={(e) => setBlog(e.target.value)}   
               required/>
         </div>
         <input type="submit" value="Submit" className="sideSubmit"/>
      </form>
    </div>
  )
}

export default SideBlog