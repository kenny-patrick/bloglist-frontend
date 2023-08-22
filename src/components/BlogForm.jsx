import { useState } from 'react'

const BlogForm = ({ blogService, setNotifClass, setNotifMsg, resetNotif, blogFormRef, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogFormRef.current.toggleVisibility()

    blogService.create(newBlog).then(blog => {
      setBlogs(blogs.concat(blog))
      setNotifMsg(`a new blog ${blog.title} by ${blog.author} created`)
      setNotifClass('message')
      resetNotif()
      resetBlogForm()
    }).catch(error => {
      setNotifMsg(error)
      setNotifClass('error')
      resetNotif()
      resetBlogForm()
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm