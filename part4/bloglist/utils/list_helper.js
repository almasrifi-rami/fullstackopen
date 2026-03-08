const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const bestBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    return blogs.reduce((best, current) => {
      return (current.likes > best.likes) ? current : best
    })
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogsByAuthor = _.countBy(blogs, 'author')
  const [bestAuthor, nBlogs] = _.maxBy(Object.entries(blogsByAuthor), (obj) => obj[1])
  return {
    author: bestAuthor,
    blogs: nBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const bestAuthor = _(blogs)
    .groupBy('author')
    .map((authorBlogs, authorName) => ({ 'author': authorName, 'likes': _.sumBy(authorBlogs, 'likes') }))
    .maxBy('likes')
  return bestAuthor
}

module.exports = {
  dummy,
  totalLikes,
  bestBlog,
  mostBlogs,
  mostLikes
}