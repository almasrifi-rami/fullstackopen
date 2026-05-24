import Blog from './Blog'

const BlogList = ({ blogs, blogLike }) => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} blogLike={blogLike} />
  )
)

export default BlogList
