import { useState } from 'react'
import './blog.css'

const AddBlog = ({ onAdd }) => {
   const [restaurant, setRestaurant] = useState('')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState('')
   const [text, setText] = useState('')

   const onSubmit = (e) => {
      e.preventDefault()
      
      if (!text) {
         alert('Please add a blog')
         return
      }

      onAdd({restaurant, cuisine, date, rating, text})
      setText('')
      setDate('')
      setCuisine('')
      setRating('')
      setRestaurant('')
   }

   return (
      <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
         <p className="half-width-1">
            <label>Restaurant</label>
            <input 
               type="text" 
               placeholder="Input Restaurant"
               value={restaurant}
               onChange={(e) => setRestaurant(e.target.value)}   
            />
         </p>
         <p className="half-width-2">
            <label>Cuisine</label>
            <input 
               type="text" 
               placeholder="Input Cuisine" 
               value={cuisine}
               onChange={(e) => setCuisine(e.target.value)}   
            />
         </p>
         <p className="half-width-1">
            <label>Date</label>
            <input 
               type="Date" 
               placeholder="" 
               value={date}
               onChange={(e) => setDate(e.target.value)}   
            />
         </p>
         <p className="half-width-2">
            <label>Score</label>
            <input 
               type="number" 
               min="1" 
               max="10" 
               placeholder="Rate Experience" 
               value={rating}
               onChange={(e) => setRating(e.target.value)}   
            />
         </p>
         <p className="full-width">
            <label>Blog</label>
            <textarea 
               name="" 
               id=""
               value={text}
               onChange={(e) => setText(e.target.value)}   
            />
         </p>
         <p className="full-width">
            <input type="submit" value="Save Blog" className="btn btn-block"/>
         </p>
      </div>
      </form>
   )
}

export default AddBlog