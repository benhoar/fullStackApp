const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
   restaurant: {
      type: String,
      required: true
   },
   cuisine: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   date: {
      type: Date, 
      required: true
   },
   blog: {
      type: String,
      required: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Review', blogSchema)