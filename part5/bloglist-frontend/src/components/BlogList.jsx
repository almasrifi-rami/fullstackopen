import Blog from './Blog'

const BlogList = ({ blogs, blogLike, blogDelete }) => (
  blogs
    .sort((a, b) => b.likes - a.likes)
    .map(blog =>
      <Blog key={blog.id} blog={blog} blogLike={blogLike} blogDelete={blogDelete} />
    )
)

export default BlogList
