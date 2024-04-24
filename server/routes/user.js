// Express
var express = require("express")
var router = express.Router()

// ValidateToken middleware
const ValidateToken = require("../auth/ValidateToken")

// Importing dotenv to use .env for secret key
require("dotenv").config()
const SECRET = process.env.SECRET

// Importing authentication tools
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// Importing the User model
const User = require("../models/User")

/* POST routes */

// Register user
router.post("/register", async (req, res) => {
  // Get the name, email, password from the request body
  const { name, email, password } = req.body

  // If not all fields are entered respond back with false message
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" })
  }

  // Check for existing users with same email
  const existingUser = await User.findOne({ email })

  // If user is found respond back with false message
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" })
  }

  // If no existing user already create a new user
  else {
    // Using bcrypt to hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err // If error occurs respond back with false message

        // Create new user to the database
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
      })
    })

    // Respond with success and message
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" })
  }
})

// Login user
router.post("/login", async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body

  // If no email or password is found respond with false message
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" })
  }

  // Check for existing users with same email
  const existingUser = await User.findOne({ email: req.body.email })

  // If user is found then compare the submitted password with the password in the database
  if (existingUser) {
    // Using bcrypt to compare the hashed password
    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) throw err
      // If passwords match then create JWT authentication token and respond with true message and the token
      if (isMatch) {
        // Create JWT token with the user email and SECRET key from config
        const token = jwt.sign({ email: existingUser.email }, SECRET, {
          expiresIn: "1h", // How long do we want the token to be valid for, currently 1h
        })

        // Respond with success and token
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: "Bearer " + token,
        })
      }

      // If user password is incorrect respond with false message
      else {
        return res
          .status(400)
          .json({ success: false, message: "Wrong credentials" })
      }
    })
  }

  // If user by email is not found respond with false message
  else {
    return res.status(400).json({ success: false, message: "User not found" })
  }
})

// Validate token
router.post("/tokenValid", ValidateToken, async (req, res) => {
  // return a success message if the token is valid
  return res
    .status(200)
    .json({ success: true, id: req.user, message: "Token is valid" })
})

// User checkout
router.post("/checkout", ValidateToken, async (req, res) => {
  const { name, cardNumber, expiryDate, cvv, total } = req.body

  if (!name || !cardNumber || !expiryDate || !cvv || !total) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" })
  } else {
    res.status(200).json({ success: true, message: "Payment successful" })
  }
})
// Export router
module.exports = router
