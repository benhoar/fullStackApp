const mongoose = require('mongoose')

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
   }
})

module.exports = mongoose.model('Cuisine', cuisineSchema)