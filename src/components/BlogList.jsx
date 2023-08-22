import { useState } from 'react'

import Blog from './Blog'

const BlogList = ({ blogService, user, blogs, setBlogs }) => {
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} blogService={blogService} user={user} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default BlogList