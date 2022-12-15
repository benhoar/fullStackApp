const mongoose = require('mongoose')
const Blog = require('../models/blogModel')

const countrySchema = mongoose.Schema({
   country: {
      type: String,
      required: true,
      unique: true
   },
   spotsVisted: {
      type: Number,
      required: true,
      default: 0,
   },
   scoreSum: {
      type: Number,
      required: true,
      default: 0,
   },
   allScores: {
      type: [Number],
      required: true,
      default: [],
   },
   topSpotScore: {
      type: Number,
      required: true,
      default: 0,
   },
   topSpot: {
      type: Blog,
      require: false,
   }
})

module.exports = mongoose.model('Country', countrySchema)