const mongoose = require('mongoose')
//const uri = `mongodb+srv://benjaminhoar:${process.env.MONGO_PASSWORD}@cuisinemap.zzvxwlt.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
      })
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
   }
   catch (err ){
      console.log(err);
      process.exit(1)
   }
}

module.exports = connectDB