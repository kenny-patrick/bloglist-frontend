import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container

  const addBlog = jest.fn()
  const blogService = jest.fn()

  beforeEach(() => {
    container = render(
      <BlogForm addBlog={addBlog} />
    ).container
  })

  test('setBlogs prop function is called when form is submitted', async () => {
    const user = userEvent.setup()
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'title')
    await user.type(inputs[1], 'author')
    await user.type(inputs[2], 'url')

    const button = screen.getByText('create')
    await user.click(button)

    expect(addBlog.mock.calls).toHaveLength(1)
  })
})