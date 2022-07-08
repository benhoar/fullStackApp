const asyncHandler = require('express-async-handler')

const Blog = require('../models/blogModel')

// @desc Get blogs
// @route GET /api/blogs
// @access NOT IMPLEMENTED
const getBlogs = asyncHandler(async (req, res) => {
   const Blogs = await Blog.find()
   res.status(200).json(Blogs)
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
   res.status(200).json({ message: `delete ${req.params.id}` })
})

module.exports = {
   getBlogs,
   postBlog,
   updateBlog,
   deleteBlog
}