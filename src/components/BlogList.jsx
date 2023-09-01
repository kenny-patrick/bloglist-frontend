import Blog from "./Blog";

const BlogList = ({ blogs, setNotification }) => {
  const blogsSortedByLikes = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogsSortedByLikes.map((blog) => (
        <Blog key={blog.id} blog={blog} setNotification={setNotification} />
      ))}
    </div>
  );
};

export default BlogList;
