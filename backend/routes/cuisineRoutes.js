const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { 
         getCuisines, 
         postCuisine, 
         updateCuisine, 
         getCuisine, 
         deleteCuisine, 
         getBlog, 
         deleteBlog,
         addBlog
      } = require('../controllers/cuisineController')

//router.get('/blog/:cuisine/:restaurant', protect, getBlog)
//router.get('/:id', protect, getCuisine)
router.get('/', protect, getCuisines) // WEBSITE√
router.get('/cuisine/:cuisine', protect, getCuisine) // WEBSITE√ 
router.get('/blog/:cuisine_id/:blog_id', protect, getBlog) //√
router.post('/', protect, postCuisine) // WEBSITE√ 
router.put('/:id', protect, updateCuisine) // WEBSITE√
router.put('/blog/:id', protect, addBlog) // WEBSITE√
router.delete('/:id', protect, deleteCuisine)
router.delete('/blog/:cuisine_id/:restaurant', protect, deleteBlog)

module.exports = router