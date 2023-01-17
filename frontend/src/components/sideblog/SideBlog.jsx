import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { getOptions, cuisines } from '../../scripts/getOptions'
import { addBlog } from '../../scripts/blogScripts/addBlog'
import './sideblog.css'

const SideBlog = ({ onClick }) => {
   const [formData, setFormData] = useState({
      _id: '',
      restaurant: '',
      cuisine: '',
      location: '',
      highlight: '',
      date: '',
      rating: '',
      blog: ''
   })
   const { user } = useAuthContext()
   const [errorMessage, setErrorMessage] = useState('')
   //const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      if (errorMessage) {
         setTimeout(() => {setErrorMessage('')}, 2000)
      }
   }, [errorMessage])

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      //setIsLoading(true)
      if (!(cuisines.has(formData.cuisine))) {
         setErrorMessage("Please Use Cuisine From List")
         //setIsLoading(false)
         return 
      }

      if (!user) {
         setErrorMessage("Please Login!")
         //setIsLoading(false)
         return 
      }
      
      const res = await addBlog(formData, user)
      if (res !== "SUCCESS") {
         setErrorMessage(res)
         setTimeout(() => {setErrorMessage("")}, 2000)
         return
      }
      //setIsLoading(false)
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
               onChange={onChange}  
               name="restaurant"
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Cuisine</label>
            <input 
               list="cuisinesInput" 
               placeholder="Input Cuisine"
               className="sideArea"
               onChange={onChange}   
               name="cuisine"
               required
            />
               <datalist id="cuisinesInput">
                  {getOptions()}
               </datalist>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Location</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Location"
               onChange={onChange}    
               name="location"
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Highlight</label>
            <input 
               className="sideArea"
               type="text" 
               placeholder="Input Highlight"
               onChange={onChange}    
               name="highlight"
            />
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Date</label>
            <input 
               className="sideArea"
               type="Date"
               placeholder=""
               onChange={onChange}   
               name="date"
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
               onChange={onChange}    
               name="rating"
               required/>
         </div>
         <div className="inputWrap">
            <label className="sideLabel">Blog</label>
            <textarea 
               className="sideArea"
               placeholder=""
               onChange={onChange} 
               name="blog"   
               required/>
         </div>
         {errorMessage.length === 0 && 
            <input type="submit" value="Submit" className="sideSubmit"/>
         }
         {errorMessage.length !== 0 && 
            <div className="errorBlog" style={{marginBottom:"10px"}}>
               {errorMessage}
            </div>
         }
      </form>
    </div>
  )
}

export default SideBlog