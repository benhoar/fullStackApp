const generateSecret = require('../generateSecret')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
   const { name, email, password, password2, secret } = req.body
   
   if (!name || !email || !password || !password2 || !secret) {
      res.status(400)
      throw new Error('Please add all fields')
   }

   // Check if user exists
   const userExists = await User.findOne({email})
   
   if (userExists) {
      res.status(400)
      throw new Error('User already exists')
   }

   if (password !== password2) {
      res.status(400)
      throw new Error('Passwords do not match')
   }

   if (secret !== generateSecret(password)) {
      res.status(400)
      throw new Error('Contact bbhoar@gmail.com to Register')
   }

   // Hash password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)

   // Create user
   const user = await User.create({
      name,
      email,
      password: hashedPassword
   })

   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      })
   } else {
      res.status(400)
      throw new Error("Invalid user data")
   }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
   const { email, password } = req.body
   const foundUser = await User.findOne({email})

   if (foundUser && await bcrypt.compare(password, foundUser.password)) {
      res.status(201).json({
         _id: foundUser.id,
         name: foundUser.name,
         email: foundUser.email,
         token: generateToken(foundUser.id)
      })
   } else {
      res.status(400)
      throw new Error("Invalid Credentials")
   }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
// I dont think this is used anywhere
const getMe = asyncHandler(async(req, res) => {
   const { _id, name, email } = await User.findById(req.user.id)
   res.status(200).json({
      id: _id,
      name,
      email
   })
})

const updateMe = asyncHandler(async(req, res) => {
   const user = await User.findById(req.user.id)
   
   if (!user) {
      res.status(400)
      throw new Error('User Not Found')
   }

   // ensure current user given password matches stored password
   if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(403)
      throw new Error('Incorrect Password')
   }

   // ensure the updated password and confirmed updated password match
   if (req.body.password2 !== req.body.password3) {
      res.status(400) 
      throw new Error('Passwords Do Not Match')
   }

   if (req.body.password === req.body.password2) {
      res.status(400)
      throw new Error('Repeat Password')
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password2, salt)
   user.password = hashedPassword
   await user.save()
   res.status(200).json(updatedUser)
})

// Generate JWT
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
   })
}

module.exports = {
   registerUser,
   loginUser,
   getMe,
   updateMe, 
}