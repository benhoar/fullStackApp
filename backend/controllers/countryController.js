const asyncHandler = require('express-async-handler')

const Country = require('../models/countryModel')

// @desc get country
// @route GET /api/countries
// @access NOT IMPLEMENTED
const getCountries = asyncHandler(async (req, res) => {
   const Countries = await Country.find()
   res.status(200).json(Countries)
})

const getCountry = asyncHandler(async (req, res) => {
   const country = await Country.findById(req.params.id)
   res.status(200).json(country)
})

// @desc set country
// @route POST /api/countries
// @access NOT IMPLEMENTED
const postCountry = asyncHandler(async (req, res) => {
   if (!req.body.country) {
      res.status(400)
      throw new Error('Please add a country name')
   }
   const country = await Country.create({
      country: req.body.country,
      rating: req.body.rating,
      blog: req.body.blog ? req.body.blog : "",
      topRestaurant: req.body.topRestaurant ? req.body.topRestaurant : ""
   })
   res.status(200).json(country)
})

// @desc update country
// @route PUT /api/countries/:id
// @access NOT IMPLEMENTED
const updateCountry = asyncHandler(async (req, res) => {
   const country = await Country.findById(req.params.id)

   if (!country) {
      res.status(400)
      throw new Error('Country Not Found')
   }

   const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, {new: true})
   res.status(200).json(updatedCountry)
})

const deleteCountry = asyncHandler(async (req, res) => {
   try {
      await Country.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "country deleted"})
   } catch {
      console.log("delete failed")
   }
})


module.exports = {
   getCountries,
   postCountry,
   updateCountry,
   getCountry,
   deleteCountry
}