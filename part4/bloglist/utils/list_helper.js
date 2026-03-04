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
  } else {
    const blogsByAuthor = _.countBy(blogs, (blog) => blog.author)
    const [bestAuthor, nBlogs] = _.maxBy(Object.entries(blogsByAuthor), (obj) => obj[1])
    return { [bestAuthor]: nBlogs }
  }
}

module.exports = {
  dummy,
  totalLikes,
  bestBlog,
  mostBlogs,
  mostLikes
}