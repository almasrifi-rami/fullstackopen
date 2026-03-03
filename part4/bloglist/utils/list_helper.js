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

module.exports = {
  dummy,
  totalLikes,
  bestBlog
}