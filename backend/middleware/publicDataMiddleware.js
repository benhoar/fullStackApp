const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Cuisine = require('../models/cuisineModel')
const ObjectId = require('mongodb').ObjectId

const publicFetch = asyncHandler(async (req, res, next) => {
   const token = req.params.user_token
   let decoded_object = new ObjectId()
   if (token !== "0000") {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      decoded_object = new ObjectId(decoded)
   } else {
      decoded_object = new ObjectId()
   }
   let cuisines
   try {
      cuisines = await Cuisine.find({ user: { $ne : decoded_object } }).limit(1000)
      res.filtered_cuisines = cuisines
      next()
   } catch (e) {
      res.status(500).json({ message: "Issue finding public cuisines"})
   }
})

module.exports = { publicFetch }