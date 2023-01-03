const express = require('express')
const router = express.Router()
const { 
         getCuisines, 
         postCuisine, 
         updateCuisine, 
         getCuisine, 
         deleteCuisine, 
         getCuisineByName, 
         getBlog, 
         deleteBlog,
         addBlog
      } = require('../controllers/CuisineController')

router.get('/', getCuisines)
router.get('/:id', getCuisine)
router.get('/cuisine/:cuisine', getCuisineByName)
router.get('/blog/:cuisine/:restaurant', getBlog)
router.post('/', postCuisine)
router.put('/:id', updateCuisine)
router.put('/blog/:id', addBlog)
router.delete('/:id', deleteCuisine)
router.delete('/blog/:cuisine/:restaurant', deleteBlog)

module.exports = router