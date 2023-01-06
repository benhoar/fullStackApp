const express = require('express') // 1st line of code of entire project
const dotenv = require('dotenv').config() // allows variables stored in .env file
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const colors = require('colors')


connectDB()

const app = express()

// middleware for using body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// so this is using a route stored in a routes file
// this is just to clean things up --> now routes
// related to the blogs page are all stored in separate 
// folder and file (post, puts, delete etc. for blogs)
app.use('/api/cuisines', require('./routes/cuisineRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// overwrites the default error hanlder
// we did this because the default error handler provides
// information poor HTML, now it returns a stack trace
// at time of this comment, errorHandler says "please add a text field"
// because we are focused on the POST request
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

/*
   Routing refers to how to get an application to respond to a request (e.g. GET) to a specific endpount (e.g. URI, path)
   Each route can have one or more handler functions that are executed when route is matched (e.g. GET to /blogs)
      app.get('/', (req, res) => res.send('Hello World!)) --> app is express instance, get is method,
      '/' is path, and the lambda is the handler method
*/