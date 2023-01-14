import { useState } from 'react'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { addBlog } from '../../scripts/blogScripts/addBlog'
import { deleteBlog } from '../../scripts/blogScripts/deleteBlog'
import { updateBlogDependants } from '../../scripts/blogScripts/updateBlogDependants'
import { getOptions, cuisines } from '../../scripts/getOptions'
import './blog.css'

const BlogForm = ({ blogData, isEdit, setBlogUpdated, setShowAddBlog }) => {
   const { user } = useAuthContext()
   const [formData, setFormData] = useState(blogData)
   const [isLoading, setIsLoading] = useState(false)
   const [errorMessage, setErrorMessage] = useState("")

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const getAction = () => {
      if (!isEdit) {
         return 'ADD NEW BLOG'
      }
      return 'BLOG EDIT'
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      const action = getAction()
      if (!(cuisines.has(formData.cuisine))) {
         setErrorMessage("Please Use Cuisine From List")
         setIsLoading(false)
         return 
      }
      setIsLoading(true)
      let res = ""
      switch (action) {
         // pure ADD functioning
         case 'ADD NEW BLOG':
            res = await addBlog(formData, user)
            if (res !== "SUCCESS") {
               setErrorMessage(res)
               setIsLoading(false)
               return
            }
            break 

         case 'BLOG EDIT':
            res = await deleteBlog(blogData.cuisine_id, blogData.restaurant, user)
            if (res !== "SUCCESS") {
               setErrorMessage(res)
               setIsLoading(false)
               return
            }

            res = await updateBlogDependants(blogData.cuisine, blogData.cuisine_id, user)
            if (res !== "SUCCESS") {
               setErrorMessage(res)
               setIsLoading(false)
               return
            }

            res = await addBlog(formData, user)
            if (res !== "SUCCESS") {
               setErrorMessage(res)
               setIsLoading(false)
               return
            }

            break
         default:
            setErrorMessage('Unknown Blog Error')
      }

      setIsLoading(false)
      setFormData(BlogForm.defaultProps.blogData)
      setBlogUpdated(true)
      setShowAddBlog(false)
   }

   return (
      <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
         <div className="half-width-1">
            <label>Restaurant</label>
            <input 
               type="text" 
               placeholder="Input Restaurant"
               name="restaurant"
               defaultValue={isEdit ? blogData.restaurant : ''}
               onChange={onChange}   
               required/>
         </div>
         <div className="half-width-2">
            <label>Cuisine</label>
            <input 
               list="cuisinesInput" 
               placeholder="Input Cuisine"
               name="cuisine"
               defaultValue={isEdit ? blogData.cuisine : ''}
               onChange={onChange}   
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
               defaultValue={isEdit ? blogData.location : ''}
               name="location"
               placeholder="Input Location"
               onChange={onChange}
               required/>
         </div>
         <div className="quarter-width-2">
            <label>Highlight</label>
            <input 
               type="text"
               defaultValue={isEdit ? blogData.highlight : ''}
               name="highlight"
               placeholder="Input Highlight"
               onChange={onChange}
               />
         </div>
         <div className="quarter-width-3">
            <label>Date</label>
            <input 
               type="date"
               defaultValue={isEdit ? blogData.date.split('T')[0] : ''}
               name="date"
               placeholder=""
               onChange={onChange}   
               required/>
         </div>
         <div className="quarter-width-4">
            <label>Rating</label>
            <input 
               type="number" 
               min="1" 
               max="10" 
               placeholder="Rate Your Experience"
               defaultValue={isEdit ? blogData.rating : ''}
               name="rating"
               onChange={onChange}   
               required/>
         </div>
         <div className="full-width">
            <label>Blog</label>
            <textarea 
               id=""
               placeholder=""
               defaultValue={isEdit ? blogData.blog : ''}
               name="blog"
               onChange={onChange}
               required/>
         </div>
         <div className="full-width">
         <input type="submit" value={isEdit ? 'Edit Blog' : 'Add Blog'} className="button btn-block" disabled={!user || isLoading}/>
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

BlogForm.defaultProps = {
   blogData: {
      cuisine_id: '',
      _id: '',
      restaurant: '',
      cuisine: '',
      location: '',
      highlight: '',
      date: '',
      rating: '',
      blog: ''
   },
   isEdit: false
}

export default BlogForm