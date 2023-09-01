import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("<Blog />", () => {
  let container;
  const createWrapper = () => {
    const queryClient = new QueryClient();

    return ({ children }) => {
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>;
    };
  };

  const mockBlog = {
    title: "Test Blog",
    author: "John",
    url: "test.com",
    likes: 44,
    user: {
      name: "John",
    },
  };

  const setNotification = jest.fn();

  beforeEach(() => {
    const wrapper = createWrapper();
    container = render(<Blog blog={mockBlog} />, {
      wrapper,
    }).container;
  });

  test("renders title and author, details are not displayed initially", () => {
    expect(container).toHaveTextContent("Test Blog John");
  });

  test("details are not displayed initially", () => {
    const div = container.querySelector(".blogDetails");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking view button, details are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".blogDetails");
    expect(div).not.toHaveStyle("display: none");
  });

  test("after clicking view button twice, details are hidden", async () => {
    const user = userEvent.setup();
    let button = screen.getByText("view");
    await user.click(button);

    button = screen.getByText("hide");
    await user.click(button);

    const div = container.querySelector(".blogDetails");
    expect(div).toHaveStyle("display: none");
  });

  test("handler function is called twice if like button is pressed twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("like");

    await user.click(button);
    await user.click(button);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
