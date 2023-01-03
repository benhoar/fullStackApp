const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
   _id: {
      type: String,
      index: true,
      required: true,
   },
   restaurant: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   location: {
      type: String,
      required: true,
   },
   highlight: {
      type: String,
      required: false,
   },
   date: {
      type: Date,
      required: true,
   },
   rating: {
      type: Number,
      required: true,
   },
   blog: {
      type: String,
      required: true,
   },
})

const cuisineSchema = mongoose.Schema({
   cuisine: {
      type: String,
      required: true,
      unique: true
   },
   spotsVisited: {
      type: Number,
      required: false,
   },
   scoreSum: {
      type: Number,
      required: false,
   },
   allScores: {
      type: Map,
      of: Number,
      required: false,
   },
   topSpotScore: {
      type: Number,
      required: false,
   },
   topSpot: {
      type: String,
      required: false,
   },
   blogs: {
      type: [blogSchema],
      required: false
   }
})

module.exports = mongoose.model('Cuisine', cuisineSchema)