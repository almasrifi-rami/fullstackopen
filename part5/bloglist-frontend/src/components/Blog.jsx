import { useState } from 'react'

const Blog = ({ blog, blogLike, blogDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    backgroundColor: 'cyan'
  }

  const [visible, setVisible] = useState(false)

  const handleView = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleView}>{!visible ? 'view' : 'hide'}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => blogLike(blog)}>like</button>
          </div>
          <div>{blog.user.username}</div>
          <div><button style={deleteButtonStyle} onClick={() => blogDelete(blog)}>remove</button></div>
        </div>
      )}
    </div>
  )
}

export default Blog
