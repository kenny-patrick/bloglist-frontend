import { useState } from 'react'

const Blog = ({ blog, blogService, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 15,
    border: 'solid black',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: '#f6f8fa'
  }


  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = {
    display: showDetails ? '' : 'none',
    listStyleType: 'none',
    padding: 0,
  }

  const handleLikeBlog = async () => {
    const blogObject = {
      user: blog.user?.id,
      likes: blog.likes + 1,

    }
    const updatedBlog = await blogService.update(blog.id, blogObject)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.remove(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button></p>
      </div>
      <ul style={showWhenVisible}>
        <li>{blog.title} {blog.author} <button onClick={toggleShowDetails}>hide</button></li>
        <li>{blog.url}</li>
        <li>likes {blog.likes} <button onClick={handleLikeBlog}>like</button></li>
        <li>{blog.user?.name}</li>
        {user.name === blog.user?.name ? <li><button onClick={handleRemoveBlog}>remove</button></li> : ''}
      </ul>
    </div>
  )
}

export default Blog