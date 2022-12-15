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
      try {
         await axios.post("/api/blogs/", {
            restaurant,
            cuisine,
            location,
            rating,
            date,
            blog,
            highlight
         })
         setBlog('')
         setDate('')
         setCuisine('')
         setRating('')
         setRestaurant('')
         setLocation('')
         setHighlight('')
         onClick()
      } catch (err) {
         console.log(err)
      }
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
            />
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Cuisine</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Cuisine"
               onChange={(e) => setCuisine(e.target.value)}   
            />
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Location</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Location"
               onChange={(e) => setLocation(e.target.value)}   
            />
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
            />
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
            />
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Blog</label>
            <textarea 
               className="sideArea"
               placeholder=""
               onChange={(e) => setBlog(e.target.value)}   
            />
         </div>
         <input type="submit" value="Submit" className="sideSubmit"/>
      </form>
    </div>
  )
}

export default SideBlog