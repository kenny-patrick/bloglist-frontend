import { useState } from 'react'

const Blog = ({ blog, blogService, user, likeBlog }) => {
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
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.remove(blog.id)
    }
  }

  const handleLike = () => {
    event.preventDefault()

    const blogObject = {
      user: blog.user?.id,
      likes: blog.likes + 1,

    }

    likeBlog(blog.id, blogObject)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button></p>
      </div>
      <div style={showWhenVisible} className={'blogDetails'}>
        <p>{blog.title} {blog.author} <button onClick={toggleShowDetails}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user?.name}</p>
        <p>{user.name === blog.user?.name ? <button onClick={handleRemoveBlog}>remove</button> : ''}</p>
      </div>
    </div>
  )
}

export default Blog