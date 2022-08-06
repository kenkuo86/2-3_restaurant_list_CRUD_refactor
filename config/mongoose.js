const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// connect to database
const db = mongoose.connection

db.on('error', () => {
  console.log('DB connection failed')
})

db.once('open', () => {
  console.log('DB connected !')
})

module.exports = db