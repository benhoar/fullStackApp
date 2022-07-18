const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
   country: {
      type: String,
      required: true,
      unique: true
   },
   rating: {
      type: String,
      required: true
   },
   blog: {
      type: String,
      required: false
   }
})

module.exports = mongoose.model('Country', countrySchema)