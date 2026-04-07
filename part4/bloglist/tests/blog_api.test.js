const assert = require('node:assert')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert(Object.hasOwn(blog, 'id'))
  assert(!Object.hasOwn(blog, '_id'))
})

test('blog can be added to the database', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Go To Statement Considered Harmful'))
})

test('blog likes default to zero', async () => {
  const blogWithoutLikes = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.find(blog => blog.title === 'Go To Statement Considered Harmful')
  assert.strictEqual(addedBlog.likes, 0)
})

describe('blog title and url must exist', () => {
  
  test('blog title must exist', async () => {
    const blogWithoutTitle = {
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(422)
      .expect('Content-Type', /application\/json/)
  })

  test('blog url must exist', async () => {
    const blogWithoutUrl = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(422)
      .expect('Content-Type', /application\/json/)
  })
})

test('blog is deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  
  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('blog is updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 10

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  assert.deepStrictEqual(updatedBlog, blogToUpdate)
  
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})


after(async () => {
  await mongoose.connection.close()
})