const express = require('express')
const router = express.Router()
const { getBlogs, postBlog, updateBlog, deleteBlog, getBlog, getBlogsByCuisine } = require('../controllers/blogController')

/*
   you CAN have the requests executed withing these router functions,
   however, it is "bad" practice, so the actions are placed instead
   in a controller folder
*/ 

// the chained methods can be done for any requests
// that share a path, I am leaving put and delete as
// unmodified examples
router.get('/', getBlogs)
router.post('/', postBlog)
router.get('/:id', getBlog)
router.get('/blog/:cuisine', getBlogsByCuisine)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

module.exports = router