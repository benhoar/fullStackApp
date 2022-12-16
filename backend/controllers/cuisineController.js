const asyncHandler = require('express-async-handler')

const Cuisine = require('../models/CuisineModel')

// @desc get Cuisine
// @route GET /api/countries
// @access NOT IMPLEMENTED
const getCuisines = asyncHandler(async (req, res) => {
   const cuisines = await Cuisine.find()
   res.status(200).json(cuisines)
})

const getCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findById(req.params.id)
   res.status(200).json(cuisine)
})

const getCuisineByName = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findOne({"cuisine": req.params.cuisine})
   if (!cuisine) {
      res.status(400)
      throw new Error("Not found")
   }
   res.status(200).json(cuisine)
})

// @desc set Cuisine
// @route POST /api/countries
// @access NOT IMPLEMENTED
const postCuisine = asyncHandler(async (req, res) => {
   if (!req.body.cuisine) {
      res.status(400)
      throw new Error('Please add a cuisine name')
   }
   const firstRating = req.body.topSpotScore
   const startMap = {}
   startMap[firstRating] = 1
   const newCuisine = await Cuisine.create({
      cuisine: req.body.cuisine,
      spotsVisited: req.body.spotsVisited ? req.body.spotsVisited : 1,
      scoreSum: req.body.topSpotScore,
      allScores: startMap,
      topSpotScore: req.body.topSpotScore,
      topSpot: req.body.topSpot

   })
   res.status(200).json(newCuisine)
})

// @desc update Cuisine
// @route PUT /api/countries/:id
// @access NOT IMPLEMENTED
const updateCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findById(req.params.id)

   if (!cuisine) {
      res.status(400)
      throw new Error('Blog Not Found')
   }

   const updatedCuisine = await Cuisine.findByIdAndUpdate(req.params.id, req.body, {new: true})
   res.status(200).json(updatedCuisine)
})

const deleteCuisine = asyncHandler(async (req, res) => {
   try {
      await Cuisine.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "Cuisine deleted"})
   } catch {
      console.log("delete failed")
   }
})


module.exports = {
   getCuisines,
   postCuisine,
   updateCuisine,
   getCuisine,
   deleteCuisine,
   getCuisineByName,
}