require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const questionRoutes = require('./routes/questions')

const app = express()

// Enhanced Middleware
app.use(cors())
app.use(express.json({ limit: '10kb' }))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message)
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

// Routes
app.use('/api/questions', questionRoutes)

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    // Start server
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.error('Database connection error:', err)
  })