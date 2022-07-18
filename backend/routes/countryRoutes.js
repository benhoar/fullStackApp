const express = require('express')
const router = express.Router()
const { getCountries, postCountry, updateCountry, getCountry } = require('../controllers/countryController')

router.route('/').get(getCountries).post(postCountry)
router.put('/:id', updateCountry).get('/:id', getCountry)

module.exports = router