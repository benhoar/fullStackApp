const asyncHandler = require('express-async-handler')

const Blog  = require('../models/blogModel')

// @desc Get blogs
// @route GET /api/blogs
// @access NOT IMPLEMENTED
const getBlogs = asyncHandler(async (req, res) => {
   const Blogs = await Blog.find()
   res.status(200).json(Blogs)
})

const getBlog = asyncHandler(async (req, res) => {
   const blog = await Blog.findById(req.params.id)
   res.status(200).json(blog)
})

const getBlogsByCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Blog.find({"cuisine": req.params.cuisine})
   if (!cuisine) {
      res.status(400)
      throw new Error("Not found")
   }
   res.status(200).json(cuisine)
})

// @desc set blogs
// @route POST /api/blogs
// @access NOT IMPLEMENTED
const postBlog = asyncHandler(async (req, res) => {
   if (!req.body.blog) {
      res.status(400)
      throw new Error('Please add a text field')
   }
   const blog = await Blog.create({
      restaurant: req.body.restaurant,
      rating: req.body.rating,
      cuisine: req.body.cuisine,
      date: req.body.date,
      blog: req.body.blog,
      location: req.body.location,
      highlight: req.body.highlight
   })
   res.status(200).json(blog)
})

// @desc update blogs
// @route PUT /api/blogs/:id
// @access NOT IMPLEMENTED
const updateBlog = asyncHandler(async (req, res) => {
   const blog = await Blog.findById(req.params.id)

   if (!blog) {
      res.status(400)
      throw new Error('Blog Not Found')
   }

   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
   res.status(200).json(updatedBlog)
})

// @desc delete blogs
// @route DELETE /api/blogs/:id
// @access NOT IMPLEMENTED
const deleteBlog = asyncHandler(async (req, res) => {
   try {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "blog deleted"})
   } catch {
      console.log("delete failed")
   }
})

module.exports = {
   getBlogs,
   postBlog,
   updateBlog,
   deleteBlog,
   getBlog,
   getBlogsByCuisine,
}