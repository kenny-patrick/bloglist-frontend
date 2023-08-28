import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifMsg, setNotifMsg] = useState(null);
  const [notifClass, setNotifClass] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  const resetNotif = () => {
    setTimeout(() => {
      setNotifMsg(null);
      setNotifClass(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotifClass("error");
      setNotifMsg("Wrong credentials");
      resetNotif();
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    blogFormRef?.current?.toggleVisibility();

    blogService
      .create(newBlog)
      .then((blog) => {
        setBlogs(blogs.concat(blog));
        setNotifMsg(`a new blog ${blog.title} by ${blog.author} created`);
        setNotifClass("message");
        resetNotif();
      })
      .catch((error) => {
        setNotifMsg(error);
        setNotifClass("error");
        resetNotif();
      });
  };

  if (user === null) {
    return (
      <div>
        <Notification notifMsg={notifMsg} notifClass={notifClass} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notifMsg={notifMsg} notifClass={notifClass} />
      <p>
        {`${user.name} has logged in`}{" "}
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          addBlog={addBlog}
          blogService={blogService}
          setNotifClass={setNotifClass}
          setNotifMsg={setNotifMsg}
          resetNotif={resetNotif}
          blogFormRef={blogFormRef}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      <br />
      <BlogList
        blogService={blogService}
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </div>
  );
};

export default App;
