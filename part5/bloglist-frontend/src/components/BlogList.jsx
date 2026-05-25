import Blog from './Blog'

const BlogList = ({ blogs, blogLike }) => (
  blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
      <Blog key={blog.id} blog={blog} blogLike={blogLike} />
    )
)

export default BlogList
