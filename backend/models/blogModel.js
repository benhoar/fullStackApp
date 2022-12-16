const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
   restaurant: {
      type: String,
      required: true,
      unique: true
   },
   cuisine: {
      type: String,
      required: false
   },
   location: {
      type: String,
      required: false
   },
   rating: {
      type: Number,
      required: false
   },
   date: {
      type: Date, 
      required: false
   },
   blog: {
      type: String,
      required: false
   },
   highlight: {
      type: String,
      required: false
   }
}, { timestamps: true })

module.exports = mongoose.model('Review', blogSchema)