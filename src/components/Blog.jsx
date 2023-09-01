import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";
import { useUserValue } from "../context/UserContext";

const Blog = ({ blog, setNotification }) => {
  const [showDetails, setShowDetails] = useState(false);
  const userValue = useUserValue();

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 15,
    border: "solid black",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#f6f8fa",
  };

  const hideWhenVisible = { display: showDetails ? "none" : "" };
  const showWhenVisible = {
    display: showDetails ? "" : "none",
  };

  const queryClient = useQueryClient();

  const removeBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlogMutation.mutate(blog.id);
      setNotification(
        `Removed blog ${blog.title} by ${blog.author}`,
        "MESSAGE",
      );
    }
  };

  const updateBlogMutation = useMutation({
    mutationFn: ([id, object]) => blogService.update(id, object),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleLike = () => {
    event.preventDefault();

    const blogObject = {
      user: blog.user?.id,
      likes: blog.likes + 1,
    };

    updateBlogMutation.mutate([blog.id, blogObject]);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className={"blogHeader"}>
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleShowDetails}>view</button>
        </p>
      </div>
      <div style={showWhenVisible} className={"blogDetails"}>
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleShowDetails}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user?.name}</p>
        <p>
          {userValue.user.name === blog.user?.name ? (
            <button onClick={handleRemoveBlog}>remove</button>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default Blog;
