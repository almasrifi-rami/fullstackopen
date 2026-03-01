const express = require('express')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')

// const Blog = require('./models/blog')

require('dotenv').config()

const app = express()


mongoose.connect(process.env.MONGODB_URI, { family: 4 })

app.use(express.json())

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})