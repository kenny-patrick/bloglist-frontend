import { useState } from 'react'

import Blog from './Blog'

const BlogList = ({ blogService, user, blogs }) => {
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

  const likeBlog = async (id, blog) => {
    await blogService.update(id, blog)
  }

  return (
    <div>
      {blogsSortedByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} blogService={blogService} user={user} likeBlog={likeBlog} />
      )}
    </div>
  )
}

export default BlogList