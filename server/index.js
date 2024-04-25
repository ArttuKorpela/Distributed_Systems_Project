const express = require("express")
const app = express()
const PORT = 8000

// Import routes
const user = require("./routes/user")
const cors = require('cors');

// Define middleware to parse JSON data
app.use(express.json())
app.use(cors());


// Importing mongoose for database
const mongoose = require("mongoose")

// Mongoose connecting to the database
const mongoDB = "mongodb://localhost:27017/webstore-project"
mongoose.connect(mongoDB, {
  family: 4, // Using IPv4
})

// Use routes
app.use("/user", user)

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
