const asyncHandler = require('express-async-handler')

const Cuisine = require('../models/cuisineModel')
const User = require('../models/userModel')

// desc get public data
// @rout GET /api/cuisines/public 
const getPublicData = asyncHandler(async (req, res) => {
   // publicDataMiddleware called!
   if (!res.filtered_cuisines) {
      res.status(400)
      throw new Error('No cuisines found')
   }
   res.status(200).json(res.filtered_cuisines)
})

// @desc get all Cuisines
// @route GET /api/cuisines
// CHECKED
const getCuisines = asyncHandler(async (req, res) => {
   const cuisines = await Cuisine.find({ user: req.user.id })
   if (!cuisines) {
      res.status(400)
      throw new Error('No cuisines found for user')
   }
   res.status(200).json(cuisines)
})

// @desc get specific Cuisine
// @route GET /api/cuisines/cuisine
// CHECKED
const getCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findOne({ user: req.user.id, cuisine: req.params.cuisine })

   if (!cuisine) {
      res.status(400)
      throw new Error('Cuisine not found for user')
   }

   res.status(200).json(cuisine)
})

// @desc get blog for user/cuisine
// @route GET /api/cuisines/blog
// CHECKED
const getBlog = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findOne({ user: req.user.id, _id: req.params.cuisine_id })

   if (!cuisine) {
      res.status(400)
      throw new Error('Cuisine blogs for requested user not found')
   }

   const blog = cuisine.blogs.id(req.params.blog_id)
   
   if (!blog) {
      res.status(400)
      throw new Error('Blog not found')
   }
   res.status(200).json(blog)
})

// @desc set Cuisine
// @route POST /api/cuisines
// CHECKED
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
      topSpot: req.body.topSpot,
      blogs: req.body.blogs,
      user: req.user.id,
   })
   res.status(200).json(newCuisine)
})

// @desc update Cuisine
// @route PUT /api/cuisines/:id
// CHECKED
const updateCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findOne({user:req.user.id, _id:req.params.id})
   
   if (!cuisine) {
      res.status(400)
      throw new Error('Cuisine Not Found')
   }

   const user = await User.findById(req.user.id) 

   // check for user
   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   // ensure current user matches cuisine author
   if (cuisine.user.toString() !== user.id) {
      res.status(401)
      throw new Error('Edit Access Denied')
   }

   const updatedCuisine = await Cuisine.findByIdAndUpdate(cuisine._id, req.body, {new: true})
   res.status(200).json(updatedCuisine)
})


// @desc update Cuisine by adding a blog
// @route PUT /api/cuisines/blog/:id
// Add a blog to a cuisine
// I THINK CHECKED --> HARD TO TEST
const addBlog = asyncHandler(async (req, res) => {
   await Cuisine.findOne({ user: req.user.id, _id: req.params.id })
      .then((cuisine) => {
         cuisine.blogs.push(req.body.blog)
         cuisine.markModified('blogs'); 
         cuisine.save((saverr, saveres) => {
            if (saverr) {
               console.log(`add saverr: ${saverr}`)
            }
            else {
               console.log(saveres)
            }
         })
         res.status(200).json(cuisine)
      })
      .catch((e) => {
         console.log(e)
         res.status(400).json({msg:'Error adding blog'})
      })
})

// @desc delete a Cuisine
// @route DELETE /api/cuisines/:id
// CHECKED
const deleteCuisine = asyncHandler(async (req, res) => {
   const cuisine = await Cuisine.findById(req.params.id)

   // check if cuisine exists
   if (!cuisine) {
      res.status(401)
      throw new Error('Cuisine not found')
   }

   const user = await User.findById(req.user.id) 

   // check for user
   if (!user) {
      res.status(401)
      throw new Error('User not found')
   }

   // ensure current user matches cuisine author
   if (cuisine.user.toString() !== user.id) {
      res.status(401)
      throw new Error('Edit Access Denied')
   }
   
   await cuisine.remove()
   res.status(200).json({ id: req.params.id })
})

// delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
   await Cuisine.findOne({ user:req.user.id, _id:req.params.cuisine_id })
      .then((cuisine) => {
         cuisine.blogs.pull(req.params.restaurant)
         cuisine.save(function (err) {
            if (err) {
               console.log(`Blog deletion error: ${err}`)
               return
            };
            console.log('the blog was removed');
          });
         res.status(200).json({msg: "Blog deleted"})
       })
       .catch((e) => {
         res.status(400)
         throw new Error(`Error Deleting: ${e}`)
       })
})

module.exports = {
   getPublicData,
   getCuisines,
   postCuisine,
   updateCuisine,
   getCuisine,
   deleteCuisine,
   getBlog,
   deleteBlog,
   addBlog
}