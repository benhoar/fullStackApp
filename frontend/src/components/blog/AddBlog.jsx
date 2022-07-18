import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './blog.css'

const axios = require('axios').default

const AddBlog = ({ onClose,
                   buttontxt,
                   defRest,
                   defCuis,
                   defRating,
                   defDate,
                   defBlog,
                   postId
                }) => {
   const [restaurant, setRestaurant] = useState('')
   const [cuisine, setCuisine] = useState('')
   const [date, setDate] = useState('')
   const [rating, setRating] = useState('')
   const [blog, setBlog] = useState('')

   const nav = useNavigate()

   useEffect(() => {
      const setStates = () => {
         setRestaurant(defRest)
         setCuisine(defCuis)
         setDate(defDate)
         setRating(defRating)
         setBlog(defBlog)
      }
      setStates()
   }, [defRest, defCuis, defRating, defDate, defBlog])

   const onSubmit = async (e) => {
      e.preventDefault()
      try {
         if (buttontxt === 'Save Blog') {
            await axios.post("/api/blogs/", {
               restaurant,
               cuisine,
               rating,
               date,
               blog
            })
            setBlog('')
            setDate('')
            setCuisine('')
            setRating('')
            setRestaurant('')
            onClose()
         } else {
            await axios.put(`/api/blogs/${postId}`, {
               restaurant,
               cuisine,
               rating,
               date,
               blog
            })
            nav('/blogs')
         }
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <form className="add-form" onSubmit={onSubmit}>
         <div className="form-control">
            <p className="half-width-1">
               <label>Restaurant</label>
               <input 
                  type="text" 
                  placeholder="Input Restaurant"
                  defaultValue={defRest}
                  onChange={(e) => setRestaurant(e.target.value)}   
               />
            </p>
            <p className="half-width-2">
               <label>Cuisine</label>
               <input 
                  type="text" 
                  placeholder="Input Cuisine"
                  defaultValue={defCuis}
                  onChange={(e) => setCuisine(e.target.value)}   
               />
            </p>
            <p className="half-width-1">
               <label>Date</label>
               <input 
                  type="Date"
                  defaultValue={defDate}
                  placeholder=""
                  onChange={(e) => setDate(e.target.value)}   
               />
            </p>
            <p className="half-width-2">
               <label>Score</label>
               <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  placeholder="Rate Your Experience"
                  defaultValue={defRating}
                  onChange={(e) => setRating(e.target.value)}   
               />
            </p>
            <p className="full-width">
               <label>Blog</label>
               <textarea 
                  name="" 
                  id=""
                  placeholder=""
                  defaultValue={defBlog}
                  onChange={(e) => setBlog(e.target.value)}   
               />
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
    onClose: () => null,
    defRest: '',
   //  defCuis: '',
   //  defRating: '',
}

export default AddBlog