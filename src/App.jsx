import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { useNotificationDispatch } from "./context/NotificationContext";
import { useUserDispatch, useUserValue } from "./context/UserContext";

const App = () => {
  const queryClient = useQueryClient();

  const blogFormRef = useRef();

  const notificationDispatch = useNotificationDispatch();
  const userValue = useUserValue();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const setNotification = (notifMsg, notifClass) => {
    notificationDispatch({
      type: notifClass,
      payload: {
        notifMsg,
        notifClass,
      },
    });
    setTimeout(() => {
      notificationDispatch({
        type: "CLEAR",
      });
    }, 5000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({
        type: "LOGIN",
        payload: user,
      });
    } catch (exception) {
      setNotification("Wrong credentials", "ERROR");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    userDispatch({
      type: "LOGOUT",
      payload: "",
    });
  };

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      setNotification("Error: unable to create new blog", "ERROR");
    },
  });

  const addBlog = (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
    };

    blogFormRef?.current?.toggleVisibility();
    newBlogMutation.mutate(newBlog);
    setNotification(`a new blog ${title} by ${author} created`, "MESSAGE");
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data....</div>;
  }

  if (result.isError) {
    return <div>cannot load data due to error in blog service</div>;
  }

  const blogs = result.data;

  if (!userValue.isAuthenticated) {
    return (
      <div>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {`${userValue.user.name} has logged in `}
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      <BlogList blogs={blogs} setNotification={setNotification} />
    </div>
  );
};

export default App;
