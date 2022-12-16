const express = require('express')
const router = express.Router()
const { getCuisines, postCuisine, updateCuisine, getCuisine, deleteCuisine, getCuisineByName } = require('../controllers/CuisineController')

router.get('/', getCuisines)
router.get('/:id', getCuisine)
router.get('/cuisine/:cuisine', getCuisineByName)
router.post('/', postCuisine)
router.put('/:id', updateCuisine)
router.delete('/:id', deleteCuisine)

module.exports = router